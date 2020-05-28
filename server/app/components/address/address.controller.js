const { handlerFor } = require('../../shared');
const { AddressModel } = require('../../models');

// [GET] Address => get one (by id)
module.exports.getOneById = async ({
  params: { id: addressId },
  res,
}) => {
  try {
    const {
      object: addressObj,
      isFind: addressFounded,
    } = await AddressModel.findOneById(addressId);

    return (addressFounded)
      ? handlerFor.SUCCESS_ONE(res, 200, addressObj)
      : handlerFor.ERROR_NOT_FOUND(res, 'address not found in database !');
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [PUT] Address => update one (by id)
module.exports.updateOneById = async ({
  params: { id: addressId },
  body,
  res,
}) => {
  try {
    const {
      object: addressObj,
      isUpdate: addressUpdated,
    } = await AddressModel.updateOneById(addressId, body);

    return (addressUpdated)
      ? handlerFor.SUCCESS_ONE(res, 200, addressObj)
      : handlerFor.ERROR_NOT_FOUND(res, 'address not found in database !');
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};
