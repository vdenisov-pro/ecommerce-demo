const modelHelper = require('./model-methods');

class AbstractModel {
  static async createNew(data) {
    const dbData = await this.schema.create(data);

    return { object: dbData };
  }

  static async getAll(filterParams, offset, limit) {
    const { rows, count } = await this.schema.findAndCountAll({
      where: filterParams,
      offset,
      limit,
    });

    return modelHelper.formatPagination(rows, count, offset, limit);
  }

  static async findOneById(id) {
    const dbData = await this.schema.findOne({
      where: {
        id: { $eq: id },
      },
    });

    return (dbData === null)
      ? { isFind: false, object: null }
      : { isFind: true, object: dbData };
  }

  static async updateOneById(id, updates) {
    const dbData = await this.schema.update({
      ...updates,
    }, {
      where: {
        id: { $eq: id },
      },
      returning: true,
    });
    const [rowUpdate, arrayWithUpdates] = dbData;

    return (rowUpdate === 0)
      ? { isUpdate: false, object: null }
      : { isUpdate: true, object: arrayWithUpdates[0] };
  }

  static async deleteOneById(id) {
    const rowDelete = await this.schema.destroy({
      where: {
        id: { $eq: id },
      },
    });

    return (rowDelete === 0)
      ? { isDelete: false }
      : { isDelete: true };
  }
}

AbstractModel.schema = null;

module.exports = AbstractModel;
