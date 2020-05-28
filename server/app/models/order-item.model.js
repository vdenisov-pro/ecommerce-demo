const {
  OrderItemSchema,
  ProductSchema,
} = require('../../db/schemas');

const { AbstractModel } = require('../shared');

const { dbDataToJson } = require('../utils');


class OrderItemModel extends AbstractModel {
  static async filterByOrderId(orderId) {
    const { rows } = await OrderItemSchema.findAndCountAll({
      where: { orderId },
      include: [
        {
          model: ProductSchema,
          as: 'product',
        },
      ],
    });

    const orderItemList = dbDataToJson(rows);
    return orderItemList;
  }

  static async createNew(data) {
    const dbData = await this.schema.create(data);
    const { dataValues: orderItemObj } = dbData;
    return { object: orderItemObj };
  }

  static async createSeveral(dataList) {
    const dbData = await OrderItemSchema.bulkCreate(dataList);
    return { object: dbData };
  }
}

OrderItemModel.schema = OrderItemSchema;

// TODO: replace on "export default OrderItemModel"
module.exports = OrderItemModel;
