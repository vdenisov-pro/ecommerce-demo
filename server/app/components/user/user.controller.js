const _ = require('lodash');

const { handlerFor } = require('../../shared');
const { AuthService, FirebaseService } = require('../../services');
const { AuthModel, UserModel, ManagementModel } = require('../../models');
const { userRoles } = require('../../shared');
const {
  USER_ALREADY_EXIST_EMAIL,
  USER_ALREADY_EXIST_PHONE,
} = require('../../../lib/errors');

// [POST] User => create new
module.exports.createNew = async ({
  body,
  res,
  error,
}) => {
  const {
    role: userRole,
    email: userEmail,
    password: userPassword,
    managerId,
  } = body;

  try {
    // STEP 1: create user in DB
    const passHash = AuthService.createPasswordHash(userPassword);
    const userData = _.assign(body, { password: passHash });
    const { object: userObj } = await UserModel.createNew(userData);

    // STEP 2: create user on Firebase
    const firebaseUser = await FirebaseService
      .createUserByEmailAndPassword(userEmail, userPassword);

    // STEP 3: save info about (database UID) and (firebase UID)
    await AuthModel.createNew({
      databaseUID: userObj.id,
      firebaseUID: firebaseUser.uid,
    });

    // STEP 4: save extra info for client
    if (userRole === userRoles.CLIENT) {
      await ManagementModel.createNew({ managerId, clientId: userObj.id });
    }

    // STEP 5: generate result object
    const result = (userRole === userRoles.CLIENT)
      ? (await UserModel.findOneClientById(userObj.id)).object
      : userObj;

    return handlerFor.SUCCESS_ONE(res, 201, result);
  } catch (err) {
    if (err.original && err.original.constraint === 'User_email_key') {
      return error(USER_ALREADY_EXIST_EMAIL());
    }
    if (err.original && err.original.constraint === 'User_phone_key') {
      return error(USER_ALREADY_EXIST_PHONE());
    }
    return error(err);
  }
};

// [GET] User => get all
module.exports.getAll = async ({
  query: {
    role,
    offset,
    limit,
  },
  res,
  error,
}) => {
  const data = {};
  let queryResult;

  try {
    switch (role) {
      case userRoles.MANAGER:
        queryResult = await UserModel.getAllManagers(offset, limit);
        break;

      case userRoles.COURIER:
        queryResult = await UserModel.getAllCouriers(offset, limit);
        break;

      case userRoles.CLIENT:
        queryResult = await UserModel.getAllClients(offset, limit);
        break;

      default:
        queryResult = await UserModel.getAll(offset, limit);
        break;
    }

    _.assign(data, queryResult);

    return handlerFor.SUCCESS_ALL(res, 200, data.results, data.count, data.previous, data.next);
  } catch (err) {
    return error(err);
  }
};

// [GET] User => get current
module.exports.getCurrent = async ({
  req: { user },
  res,
}) => handlerFor.SUCCESS_ONE(res, 200, user);

// [GET] User => get filtered for autocomplete
module.exports.searchBy = async ({
  query: {
    role,
    name,
    companyId,
    offset,
    limit,
  },
  res,
  error,
}) => {
  try {
    const {
      results, count, previous, next,
    } = await UserModel.getFilteredBy(
      role,
      name,
      offset,
      limit,
      companyId,
    );
    return handlerFor.SUCCESS_ALL(res, 200, results, count, previous, next);
  } catch (err) {
    return error(err);
  }
};

// [GET] User => get one (by id)
module.exports.getOneById = async ({
  params: { id: userId },
  res,
  error,
}) => {
  const {
    object: userObj,
    isFind: userFounded,
  } = await UserModel.findOneById(userId);

  if (!userFounded) {
    return handlerFor.ERROR_NOT_FOUND(res, 'user not found in database !');
  }

  let userData = null;

  try {
    switch (userObj.role) {
      case userRoles.MANAGER:
        userData = await UserModel.findOneManagerById(userId);
        break;

      case userRoles.COURIER:
        userData = await UserModel.findOneCourierById(userId);
        break;

      case userRoles.CLIENT:
        userData = await UserModel.findOneClientById(userId);
        break;

      default:
        break;
    }

    return handlerFor.SUCCESS_ONE(res, 200, userData.object);
  } catch (err) {
    return error(err);
  }
};

// [PUT] User => update one (by id)
module.exports.updateOneById = async ({
  params: { id: userId },
  body,
  res,
  error,
}) => {
  const inputData = _.omit(body, ['id', 'createdAt', 'updatedAt']);
  try {
    const {
      object: userObj,
      isUpdate: userUpdated,
    } = await UserModel.updateOneById(userId, inputData);

    const result = (userObj.role === userRoles.CLIENT)
      ? (await UserModel.findOneClientById(userObj.id)).object
      : userObj;

    return (userUpdated)
      ? handlerFor.SUCCESS_ONE(res, 200, result)
      : handlerFor.ERROR_NOT_FOUND(res, 'user not found in database !');
  } catch (err) {
    return error(err);
  }
};

// [DELETE] User => delete one (by id)
module.exports.deleteOneById = async ({
  params: { id: userId },
  res,
  error,
}) => {
  try {
    // STEP 1: delete user from DB
    const { isDelete: userDeleted } = await UserModel.deleteOneById(userId);
    if (!userDeleted) {
      return handlerFor.ERROR_NOT_FOUND(res, 'user not found in database !');
    }

    const { object: authInfo } = await AuthModel.findOneByDatabaseUID(userId);
    if (authInfo) {
      // STEP 2: delete user from Firebase
      await FirebaseService.deleteUserByUid(authInfo.firebaseUID);
      // STEP 3: delete auth info
      await AuthModel.deleteOneById(authInfo.id);
    }

    return (userDeleted)
      ? handlerFor.SUCCESS_ONE(res, 200)
      : handlerFor.ERROR_NOT_FOUND(res, 'user not found in database !');
  } catch (err) {
    return error(err);
  }
};
