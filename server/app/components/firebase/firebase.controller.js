const { handlerFor } = require('../../shared');
const { FirebaseService } = require('../../services');

// [POST] Firebase => verify token
module.exports.verifyToken = async ({
  body: { token },
  res,
}) => {
  try {
    const tokenData = await FirebaseService.verifyIdToken(token);
    return handlerFor.SUCCESS_ONE(res, 200, tokenData);
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [POST] Firebase => sign-up user
module.exports.signUp = async ({
  body: { email, password },
  res,
}) => {
  try {
    const userData = await FirebaseService.createUserByEmailAndPassword(email, password);
    return handlerFor.SUCCESS_ONE(res, 200, userData);
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [POST] Firebase => sign-in user
module.exports.signIn = async ({
  body: { email, password },
  res,
}) => {
  try {
    const userData = await FirebaseService.authorizeUserByEmailAndPassword(email, password);
    return handlerFor.SUCCESS_ONE(res, 200, userData);
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [POST] Firebase => get all users
module.exports.getAllUsers = async ({ res }) => {
  try {
    const usersList = await FirebaseService.getAllUsers();
    return handlerFor.SUCCESS_ALL(res, 200, usersList);
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [DELETE] Firebase => delete user by uid
module.exports.deleteFromFirebaseByUid = async ({
  params: { uid: firebaseUid },
  res,
}) => {
  try {
    const userData = await FirebaseService.deleteUserByUid(firebaseUid);
    return handlerFor.SUCCESS_ONE(res, 200, userData);
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};
