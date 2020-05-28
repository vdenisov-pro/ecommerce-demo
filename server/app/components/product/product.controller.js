const _ = require('lodash');
const { handlerFor } = require('../../shared');
const { ProductModel, ImageModel } = require('../../models');

// [POST] Product => create new
module.exports.createNew = async ({
  body,
  res,
}) => {
  try {
    // STEP 1: create product
    const {
      object: productObj,
    } = await ProductModel.createNew(body);

    return handlerFor.SUCCESS_ONE(res, 201, productObj);
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [GET] Product => get all
module.exports.getAll = async ({
  query: {
    categoryId,
    offset,
    limit,
  },
  res,
}) => {
  const filterParams = categoryId ? { categoryId } : {};

  try {
    const {
      results, count, previous, next,
    } = await ProductModel.getAll(
      filterParams,
      offset,
      limit,
    );
    return handlerFor.SUCCESS_ALL(res, 200, results, count, previous, next);
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [GET] Product => get filtered for autocomplete
module.exports.searchBy = async ({
  query: {
    name,
    offset,
    limit,
  },
  res,
}) => {
  try {
    const {
      results, count, previous, next,
    } = await ProductModel.getFilteredBy(
      name,
      offset,
      limit,
    );
    return handlerFor.SUCCESS_ALL(res, 200, results, count, previous, next);
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [GET] Product => get one (by id)
module.exports.getOneById = async ({
  params: { id: productId },
  res,
}) => {
  try {
    const {
      object: productObj,
      isFind: productFounded,
    } = await ProductModel.findOneById(productId);

    return (productFounded)
      ? handlerFor.SUCCESS_ONE(res, 200, productObj)
      : handlerFor.ERROR_NOT_FOUND(res, 'product not found in database !');
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [PUT] Product => update one (by id)
module.exports.updateOneById = async ({
  params: { id: productId },
  body,
  res,
}) => {
  const updates = _.omit(body, ['id', 'createdAt', 'updatedAt', 'images']);
  try {
    // TODO: optimize this method

    // const {
    //   object: productObj,
    //   isUpdate: productUpdated,
    // } = await ProductModel.updateOneById(productId, updates);

    await ProductModel.updateOneById(productId, updates);

    const {
      object: productObj,
      isFind: productFounded,
    } = await ProductModel.findOneById(productId);

    return (productFounded)
      ? handlerFor.SUCCESS_ONE(res, 200, productObj)
      : handlerFor.ERROR_NOT_FOUND(res, 'product not found in database !');
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [DELETE] Product => delete one (by id)
module.exports.deleteOneById = async ({
  params: { id: productId },
  res,
}) => {
  try {
    const {
      isDelete: productDeleted,
    } = await ProductModel.deleteOneById(productId);

    return (productDeleted)
      ? handlerFor.SUCCESS_ONE(res, 200)
      : handlerFor.ERROR_NOT_FOUND(res, 'product not found in database !');
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [PUT] Product => upload image
module.exports.uploadImage = async ({
  req,
  res,
}) => {
  const { id: productId } = req.params;

  // Step 2: get urls to image size instances
  const {
    original: { Location: originalUrl },
    xsmall: { Location: xsmallUrl },
    small: { Location: smallUrl },
    medium: { Location: mediumUrl },
    large: { Location: largeUrl },
  } = req.file;

  const { isFind: productFounded } = await ProductModel.findOneById(productId);
  if (!productFounded) {
    return handlerFor.ERROR_NOT_FOUND(res, 'product not found in database !');
  }

  // Step 2.2: update link in to product images
  try {
    const { object: imageObj } = await ImageModel.createNew({
      productId,
      original: originalUrl,
      xsmall: xsmallUrl,
      small: smallUrl,
      medium: mediumUrl,
      large: largeUrl,
    });

    return handlerFor.SUCCESS_ONE(res, 200, imageObj);
  } catch (err) {
    const errMsg = err.message || err.name;
    return handlerFor.ERROR_ON_UPLOADING(res, errMsg);
  }
};
