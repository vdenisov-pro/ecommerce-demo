const _ = require('lodash');
const {
  map,
  sum,
  prop,
  pipe,
} = require('ramda');

const {
  handlerFor,
  omitProps,
} = require('../../shared');

const {
  OrderModel,
  OrderItemModel,
  ProductModel,
} = require('../../models');

const {
  ORDER_NOT_FOUND,
  ORDER_ITEM_NOT_FOUND,
} = require('../../../lib/errors');

// TODO: make in one pass or rewrite to db-request level
const calculateOrderPrice = (items) => {
  const price = pipe(
    map((item) => prop('productPrice', item) * prop('productNumber', item)),
    sum,
  )(items);

  const discount = pipe(
    map(prop('productDiscount')),
    sum,
  )(items);

  const totalPrice = price - discount;

  return { price, totalPrice, discount };
};

// [POST] Order => create new
module.exports.createNew = async ({
  body,
  res,
  error,
  req: { userId: authorId },
}) => {
  try {
    const orderData = { authorId, ...body };

    const {
      object: orderObj,
    } = await OrderModel.createNew(orderData);

    const {
      object: orderObjWithJoins,
    } = await OrderModel.findOneById(orderObj.id);

    return handlerFor.SUCCESS_ONE(res, 201, orderObjWithJoins);
  } catch (err) {
    return error(err);
  }
};

// [GET] Order => get all
module.exports.getAll = async ({
  query: {
    authorId,
    addressId,
    status,
    offset,
    limit,
  },
  res,
  error,
}) => {
  const filterParams = { authorId, addressId, status };

  try {
    const {
      results, count, previous, next,
    } = await OrderModel.getAll(filterParams, offset, limit);

    // const responseData = map(orderObj => ({
    //   ...orderObj,
    //   ...calculateOrderPrice(orderObj.items),
    // }), results);

    return handlerFor.SUCCESS_ALL(res, 200, results, count, previous, next);
  } catch (err) {
    return error(err);
  }
};

// [GET] Order => get one (by id)
module.exports.getOneById = async ({
  params: { id: orderId },
  res,
  error,
}) => {
  try {
    const {
      object: orderObj,
      isFind: orderFounded,
    } = await OrderModel.findOneById(orderId);

    // const response = {
    //   ...orderObj,
    //   // ...calculateOrderPrice(orderObj.items),
    // };

    return (orderFounded)
      ? handlerFor.SUCCESS_ONE(res, 200, orderObj)
      : error(ORDER_NOT_FOUND());
  } catch (err) {
    return error(err);
  }
};

// [PUT] Order => update one (by id)
module.exports.updateOneById = async ({
  params: { id: orderId },
  body,
  res,
  error,
}) => {
  const updates = _.omit(body, omitProps.DEFAULT_OMIT_PROPS);
  try {
    const { isUpdate: orderUpdated } = await OrderModel.updateOneById(orderId, updates);

    const { object: orderObj } = await OrderModel.findOneById(orderId);

    return (orderUpdated)
      ? handlerFor.SUCCESS_ONE(res, 200, orderObj)
      : error(ORDER_NOT_FOUND());
  } catch (err) {
    return error(err);
  }
};

// [DELETE] Order => delete one (by id)
module.exports.deleteOneById = async ({
  params: { id: orderId },
  res,
  error,
}) => {
  try {
    const {
      isDelete: orderDeleted,
    } = await OrderModel.deleteOneById(orderId);

    return (orderDeleted)
      ? handlerFor.SUCCESS_ONE(res, 200)
      : error(ORDER_NOT_FOUND());
  } catch (err) {
    return error(err);
  }
};

module.exports.getOrderItems = async ({
  params: { id: orderId },
  res,
  error,
}) => {
  try {
    const orderItemList = await OrderItemModel.filterByOrderId(orderId);
    const { totalPrice } = calculateOrderPrice(orderItemList);
    const result = { items: orderItemList, totalPrice };

    return handlerFor.SUCCESS_ONE(res, 200, result);
  } catch (err) {
    return error(err);
  }
};

module.exports.createOrderItem = async ({
  params: { id: orderId },
  body: { productId, ...orderData },
  res,
  error,
}) => {
  try {
    const itemData = {
      orderId,
      productId,
      ...orderData,
    };

    const { object: item } = await OrderItemModel.createNew(itemData);

    const { object: product } = await ProductModel.findOneById(productId);

    return handlerFor.SUCCESS_ONE(res, 201, _.assign(item, { product }));
  } catch (err) {
    return error(err);
  }
};

module.exports.updateOrderItem = async ({
  params: { orderId, id },
  body: productData,
  res,
  error,
}) => {
  try {
    const itemData = {
      ...productData,
      orderId,
    };

    const updates = _.omit(itemData, omitProps.DEFAULT_OMIT_PROPS);
    const {
      object: orderItem,
      isUpdate: orderItemUpdated,
    } = await OrderItemModel.updateOneById(id, updates);

    return (orderItemUpdated)
      ? handlerFor.SUCCESS_ONE(res, 200, orderItem)
      : error(ORDER_ITEM_NOT_FOUND());
  } catch (err) {
    return error(err);
  }
};

module.exports.deleteOrderItem = async ({
  params: { id },
  res,
  error,
}) => {
  try {
    const {
      isDelete: orderDeleted,
    } = await OrderItemModel.deleteOneById(id);

    return (orderDeleted)
      ? handlerFor.SUCCESS_ONE(res, 200)
      : error(ORDER_ITEM_NOT_FOUND());
  } catch (err) {
    return error(err);
  }
};
