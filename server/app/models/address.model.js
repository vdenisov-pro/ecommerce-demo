const _ = require('lodash');
const { Op } = require('sequelize');

const {
  CountrySchema,
  CitySchema,
  AddressSchema,

  UserSchema,
} = require('../../db/schemas');
const { AbstractModel, modelHelper } = require('../shared');

function formatAddressObj(addressObj) {
  const {
    city: {
      name: cityName,
      country: { name: countryName },
    },
  } = addressObj;

  return _.assign(
    _.omit(addressObj, ['cityId', 'companyId', 'courierId']),
    { country: countryName, city: cityName },
  );
}

class AddressModel extends AbstractModel {
  static async findOneOrCreate(addressData) {
    const [object, isNew] = await AddressSchema.findOrCreate({
      where: {
        cityId: { $eq: addressData.cityId },
        companyId: { $eq: addressData.companyId },

        street: { $eq: addressData.street },
        house: { $eq: addressData.house },
        comment: { $eq: addressData.comment },
        courierId: { $eq: addressData.courierId },
      },
      defaults: {
        ...addressData,
      },
    });

    return { object, isNew };
  }


  static async findOneById(addressId) {
    const dbData = await AddressSchema.findOne({
      where: {
        id: { $eq: addressId },
      },
      include: [
        {
          model: CitySchema,
          as: 'city',
          include: [
            { model: CountrySchema, as: 'country' },
          ],
        },
        { model: UserSchema, as: 'courier' },
      ],
    });

    if (dbData === null) {
      return { isFind: false, object: dbData };
    }
    const { dataValues: addressObj } = dbData;
    return { isFind: true, object: formatAddressObj(addressObj) };
  }

  static async getFilteredBy(companyId, q, offset, limit) {
    const { rows: addressList, count } = await AddressSchema.findAndCountAll({
      where: {
        [Op.and]: [
          companyId && { companyId },
          q && { street: { $like: `%${q}%` } },
        ],
      },
      include: [
        {
          model: CitySchema,
          as: 'city',
          include: [
            { model: CountrySchema, as: 'country' },
          ],
        },
        { model: UserSchema, as: 'courier' },
      ],
      offset,
      limit,
    });

    return modelHelper.formatPagination(
      addressList.map((addressObj) => formatAddressObj(addressObj.dataValues)),
      count,
      offset,
      limit,
    );
  }
}

AddressModel.schema = AddressSchema;

module.exports = AddressModel;
