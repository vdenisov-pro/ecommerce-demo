const _ = require('lodash');
const {
  OrderSchema,
  CompanySchema,
  UserSchema,
  LegalPersonSchema,
  AddressSchema,
  CitySchema,
  CountrySchema,
} = require('../../db/schemas');

const { AbstractModel } = require('../shared');
const { dbDataToJson, rejectUndefined } = require('../utils');

const { modelHelper } = require('../shared');

// Address formatting

function formatAddressObj(addressObj) {
  const {
    city: {
      name: cityName,
      country: { name: countryName },
    },
  } = addressObj;

  return _.assign(
    addressObj,
    { country: countryName, city: cityName },
  );
}

// Order formatting

function formatOrderObj(orderObj) {
  if (!orderObj.address) return orderObj;

  const { address } = _.pick(orderObj, ['address']);

  return _.assign(
    _.omit(orderObj, ['address']),
    { address: formatAddressObj(address) },
  );
}

function formatOrderList(orderList) {
  return _.map(orderList, (orderObj) => formatOrderObj(orderObj));
}

class OrderModel extends AbstractModel {
  static async createNew(data) {
    const dbData = await this.schema.create(data);

    return { object: dbDataToJson(dbData) };
  }

  static async getAll(filterParams, offset, limit) {
    const { rows, count } = await OrderSchema.findAndCountAll({
      where: rejectUndefined(filterParams),
      offset,
      limit,
      distinct: true,
      include: [
        {
          model: CompanySchema,
          as: 'company',
        },
        {
          model: UserSchema,
          as: 'manager',
        },
        {
          model: UserSchema,
          as: 'author',
        },
        {
          model: AddressSchema,
          as: 'address',
          include: [
            {
              model: CitySchema,
              as: 'city',
              include: [
                { model: CountrySchema, as: 'country' },
              ],
            },
          ],
        },
      ],
    });

    const orderList = dbDataToJson(rows);

    const formattedOrderList = formatOrderList(orderList);

    return modelHelper.formatPagination(formattedOrderList, count, offset, limit);
  }

  static async findOneById(id) {
    const dbData = await this.schema.findOne({
      where: {
        id: { $eq: id },
      },
      include: [
        {
          model: CompanySchema,
          as: 'company',
        },
        {
          model: LegalPersonSchema,
          as: 'legalPerson',
        },
        {
          model: UserSchema,
          as: 'client',
        },
        {
          model: UserSchema,
          as: 'manager',
        },
        {
          model: UserSchema,
          as: 'user',
        },
        {
          model: AddressSchema,
          as: 'address',
          include: [
            {
              model: CitySchema,
              as: 'city',
              include: [
                { model: CountrySchema, as: 'country' },
              ],
            },
          ],
        },
      ],
    }).then(dbDataToJson);

    const formattedOrderObj = formatOrderObj(dbData);

    return (dbData === null)
      ? { isFind: false, object: null }
      : { isFind: true, object: formattedOrderObj };
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
}

OrderModel.schema = OrderSchema;

module.exports = OrderModel;
