const _ = require('lodash');
const { handlerFor } = require('../../shared');
const { CategoryModel } = require('../../models');

// [POST] Category => create new
module.exports.createNew = async ({
  body: inputData,
  res,
}) => {
  try {
    const { object: categoryObj } = await CategoryModel.createNew(inputData);
    return handlerFor.SUCCESS_ONE(res, 201, categoryObj);
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [GET] Category => get all
module.exports.getAll = async ({
  res,
}) => {
  try {
    const { results } = await CategoryModel.getAll();
    return handlerFor.SUCCESS_ALL(res, 200, results);
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [GET] Category => get one (by id)
module.exports.getOneById = async ({
  params: { id: categoryId },
  res,
}) => {
  try {
    const {
      object: categoryObj,
      isFind: categoryFounded,
    } = await CategoryModel.findOneById(categoryId);

    return (categoryFounded)
      ? handlerFor.SUCCESS_ONE(res, 200, categoryObj)
      : handlerFor.ERROR_NOT_FOUND(res, 'category not found in database !');
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [PUT] Category => update one (by id)
module.exports.updateOneById = async ({
  params: { id: categoryId },
  body,
  res,
}) => {
  const updates = _.omit(body, ['id', 'createdAt', 'updatedAt']);
  try {
    const {
      object: categoryObj,
      isUpdate: categoryUpdated,
    } = await CategoryModel.updateOneById(categoryId, updates);

    return (categoryUpdated)
      ? handlerFor.SUCCESS_ONE(res, 200, categoryObj)
      : handlerFor.ERROR_NOT_FOUND(res, 'category not found in database !');
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [DELETE] Category => delete one (by id)
module.exports.deleteOneById = async ({
  params: { id: categoryId },
  res,
}) => {
  try {
    const {
      isDelete: categoryDeleted,
    } = await CategoryModel.deleteOneById(categoryId);

    return (categoryDeleted)
      ? handlerFor.SUCCESS_ONE(res, 200)
      : handlerFor.ERROR_NOT_FOUND(res, 'category not found in database !');
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};
