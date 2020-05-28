const { Op } = require('sequelize');
const { LegalPersonSchema } = require('../../db/schemas');
const { AbstractModel, modelHelper } = require('../shared');

class LegalPersonModel extends AbstractModel {
  static async createSeveral(dataList) {
    const dbData = await LegalPersonSchema.bulkCreate(dataList);
    return { object: dbData };
  }

  static async findOneOrCreate(legalPersonData) {
    const dbData = await LegalPersonSchema.findOrCreate({
      where: {
        type: { $eq: legalPersonData.type },
        name: { $eq: legalPersonData.name },
      },
      defaults: {
        ...legalPersonData,
      },
    });
    const [object, isNew] = dbData;
    return { object, isNew };
  }

  static async getFilteredBy(companyId, name, offset, limit) {
    const { rows: companyList, count } = await LegalPersonSchema.findAndCountAll({
      where: {
        [Op.and]: [
          companyId && { companyId },
          name && { name: { $like: `%${name}%` } },
        ],
      },
      offset,
      limit,
    });

    return modelHelper.formatPagination(companyList, count, offset, limit);
  }
}

LegalPersonModel.schema = LegalPersonSchema;

module.exports = LegalPersonModel;
