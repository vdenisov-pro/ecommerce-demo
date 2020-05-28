const { handlerFor } = require('../../shared');
const { ImageModel } = require('../../models');

// [GET] Image => get all
module.exports.getAll = async ({
  query: {
    productId,
    offset,
    limit,
  },
  res,
}) => {
  const filterParams = productId ? { productId } : {};

  try {
    const {
      results, count, previous, next,
    } = await ImageModel.getAll(
      filterParams,
      offset,
      limit,
    );
    return handlerFor.SUCCESS_ALL(res, 200, results, count, previous, next);
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [GET] Image => get one (by id)
module.exports.getOneById = async ({
  params: { id: imageId },
  res,
}) => {
  try {
    const {
      object: imageObj,
      isFind: imageFounded,
    } = await ImageModel.findOneById(imageId);

    return (imageFounded)
      ? handlerFor.SUCCESS_ONE(res, 200, imageObj)
      : handlerFor.ERROR_NOT_FOUND(res, 'image not found in database !');
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [DELETE] Image => delete one (by id)
module.exports.deleteOneById = async ({
  params: { id: imageId },
  res,
}) => {
  try {
    const {
      isDelete: imageDeleted,
    } = await ImageModel.deleteOneById(imageId);

    return (imageDeleted)
      ? handlerFor.SUCCESS_ONE(res, 200)
      : handlerFor.ERROR_NOT_FOUND(res, 'image not found in database !');
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};
