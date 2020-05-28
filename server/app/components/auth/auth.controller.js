const { handlerFor } = require('../../shared');

const { AuthService } = require('../../services');


// [POST] Auth => login existing user
module.exports.login = async ({
  body: { role, email, password },
  res,
}) => {
  try {
    await AuthService.checkUserExistence(role, email, password);

    return handlerFor.SUCCESS_ONE(res, 200, { auth: true });
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};
