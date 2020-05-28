const _ = require('lodash');

const sequelize = require('../../lib/sequelize');
const { CategorySchema, ProductSchema } = require('../../db/schemas');
const { AbstractModel } = require('../shared');

class CategoryModel extends AbstractModel {
  static async getAll() {
    const [categoryList] = await sequelize.query(`
      SELECT
        "Category".*,
        COUNT("Product"."id") AS "productCounter"
      FROM
        "Category" LEFT JOIN "Product"
        ON "Product"."categoryId" = "Category"."id"
      GROUP BY "Category"."id";
    `);

    const newCategoryList = _.map(categoryList, (category) => ({
      ...category,
      productCounter: parseInt(category.productCounter, 10),
    }));

    return {
      results: newCategoryList,
    };
  }

  static async findOneById(id) {
    const dbData = await CategorySchema.findOne({
      where: {
        id: { $eq: id },
      },
      include: [
        { model: ProductSchema, as: 'products' },
      ],
    });

    return (dbData === null)
      ? { isFind: false, object: null }
      : { isFind: true, object: dbData };
  }

  static async updateOneById(id, updates) {
    const searchedCategory = await CategorySchema.findOne({
      where: {
        id: { $eq: id },
      },
      include: [
        { model: ProductSchema, as: 'products' },
      ],
    });

    const updatedCategory = await searchedCategory.update({
      ...updates,
    }, {
      where: {
        id: { $eq: id },
      },
      returning: true,
    });

    const { dataValues: categoryObj } = updatedCategory;

    _.assign(categoryObj, { productCounter: categoryObj.products.length });
    const formattedCategory = _.omit(categoryObj, ['products']);

    return { isUpdate: true, object: formattedCategory };
  }
}

CategoryModel.schema = CategorySchema;

module.exports = CategoryModel;
