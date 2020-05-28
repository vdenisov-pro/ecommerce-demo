const { CountrySchema } = require('../../db/schemas');
const { AbstractModel } = require('../shared');

class CountryModel extends AbstractModel {
  static async findOneOrCreate(countryData) {
    const dbData = await CountrySchema.findOrCreate({
      where: {
        name: { $eq: countryData.name },
      },
      defaults: {
        ...countryData,
      },
    });
    const [object, isNew] = dbData;
    return { object, isNew };
  }
}

CountryModel.schema = CountrySchema;

module.exports = CountryModel;
