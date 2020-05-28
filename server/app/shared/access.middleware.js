const joi = require('joi');
const { AuthModel, UserModel } = require('../models');
const { FirebaseService } = require('./../services');
const {
  ERROR_ACCESS,
  ERROR_USER_AUTH,
  FORBIDDEN,
} = require('../../lib/errors');
const roles = require('./user-roles');

const checkToken = async ({
  req,
  setToReq,
  error,
  pass,
  props: { allowAccess = [roles.EVERYONE] },
}) => {
  if (allowAccess.includes(roles.EVERYONE)) {
    return pass();
  }

  const headers = {
    Authorization: req.get('Authorization'),
  };

  const joiHeadersSchema = joi.object({
    Authorization: joi.string().min(100).required(),
  });

  try {
    // STEP 1: check that token is received
    await joi.validate(headers, joiHeadersSchema);

    // STEP 2: validate firebase token
    const { uid: firebaseUID } = await FirebaseService.verifyIdToken(headers.Authorization);
    const { object: authUser } = await AuthModel.findOneByFirebaseUID(firebaseUID);
    if (!authUser) {
      return error(ERROR_USER_AUTH());
    }

    const userId = authUser.dataValues.databaseUID;
    setToReq('userId', userId);

    const { object: user } = await UserModel.findOneById(userId);

    const userRole = user.role.toUpperCase();
    const userRoleSymbol = Object.keys(roles).find((role) => userRole === role);

    if (!allowAccess.includes(roles[userRoleSymbol])) {
      error(FORBIDDEN());
    }
    setToReq('user', user.toJSON());

    return pass();
  } catch (err) {
    return error(ERROR_ACCESS());
  }
};

module.exports = {
  checkToken,
};
