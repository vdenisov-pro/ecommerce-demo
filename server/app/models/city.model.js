const { CitySchema } = require('../../db/schemas');
const { AbstractModel } = require('../shared');

class CityModel extends AbstractModel {
  static async findOneOrCreate(cityData) {
    const dbData = await CitySchema.findOrCreate({
      where: {
        countryId: { $eq: cityData.countryId },

        name: { $eq: cityData.name },
      },
      defaults: {
        ...cityData,
      },
    });
    const [object, isNew] = dbData;
    return { object, isNew };
  }
}

CityModel.schema = CitySchema;

module.exports = CityModel;
