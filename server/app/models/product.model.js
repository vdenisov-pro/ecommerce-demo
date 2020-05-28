const _ = require('lodash');

const { ProductSchema, ImageSchema } = require('../../db/schemas');
const { AbstractModel } = require('../shared');

const { modelHelper } = require('../shared');

// Product formatting

function formatProductObj(productObj) {
  return _.omit(productObj, []);
}

function formatProductList(productList) {
  const newList = _.map(productList, (item) => {
    const { dataValues: productObj } = item;

    return formatProductObj(productObj);
  });
  return newList;
}

class ProductModel extends AbstractModel {
  static async getAll(filterParams, offset, limit) {
    const { rows: productList, count } = await ProductSchema.findAndCountAll({
      where: filterParams,
      offset,
      limit,
      distinct: true,
      include: [
        {
          model: ImageSchema,
          as: 'images',
          // attributes: ['original', 'xsmall', 'small', 'medium', 'large'],
        },
      ],
    });

    // TODO: remove this formatting ?
    const newProductList = formatProductList(productList);

    return modelHelper.formatPagination(newProductList, count, offset, limit);
  }

  static async getFilteredBy(name, offset, limit) {
    const { rows: productList, count } = await ProductSchema.findAndCountAll({
      where: {
        name: { $like: `%${name}%` },
      },
      offset,
      limit,
    });

    return modelHelper.formatPagination(productList, count, offset, limit);
  }

  static async findOneById(id) {
    const dbData = await ProductSchema.findOne({
      where: {
        id: { $eq: id },
      },
      include: [
        {
          model: ImageSchema,
          as: 'images',
          // attributes: ['original', 'xsmall', 'small', 'medium', 'large'],
        },
      ],
    });

    if (!dbData) return { isFind: false, object: null };

    const { dataValues: productObj } = dbData;
    const newProductObj = formatProductObj(productObj);

    return { isFind: true, object: newProductObj };
  }
}

ProductModel.schema = ProductSchema;

module.exports = ProductModel;
