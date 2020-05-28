const _ = require('lodash');
// const { head, propOr, pipe } = require('ramda');

const { AbstractModel } = require('../shared');
const {
  CompanySchema,
  CountrySchema,
  CitySchema,
  AddressSchema,
  LegalPersonSchema,
  UserSchema,
} = require('../../db/schemas');

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

function formatAddressList(addressList) {
  return _.map(
    addressList,
    ({ dataValues: addressObj }) => formatAddressObj(addressObj),
  );
}

// Company formatting

function formatCompanyObj(companyObj) {
  const { addresses } = _.pick(companyObj, ['addresses']);

  return _.assign(
    _.omit(companyObj, ['addresses']),
    { addresses: formatAddressList(addresses) },
  );
}

class CompanyModel extends AbstractModel {
  static async getAll(offset, limit) {
    const { rows: companyList, count } = await CompanySchema.findAndCountAll({
      offset,
      limit,
      distinct: true,
      include: [
        // join addresses
        {
          model: AddressSchema,
          as: 'addresses',
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
        // join legal people
        {
          model: LegalPersonSchema,
          as: 'legalPeople',
        },
        // join manager
        {
          model: UserSchema,
          as: 'manager',
          where: { role: 'manager' },
          required: false,
        },
        // join clients
        {
          model: UserSchema,
          as: 'clients',
          where: { role: 'client' },
          required: false,
        },
      ],
    });

    const newCompanyList = _.map(companyList,
      ({ dataValues: companyObj }) => formatCompanyObj(companyObj));

    return modelHelper.formatPagination(newCompanyList, count, offset, limit);
  }

  static async getFilteredBy(name, offset, limit) {
    const { rows: companyList, count } = await CompanySchema.findAndCountAll({
      where: {
        name: { $like: `%${name}%` },
      },
      offset,
      limit,
    });

    return modelHelper.formatPagination(companyList, count, offset, limit);
  }

  static async findOneById(id) {
    const companyObj = await CompanySchema.findOne({
      where: {
        id: { $eq: id },
      },
      include: [
        // join addresses
        {
          model: AddressSchema,
          as: 'addresses',
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
        // join legal people
        {
          model: LegalPersonSchema,
          as: 'legalPeople',
        },
        // join manager
        {
          model: UserSchema,
          as: 'manager',
          where: { role: 'manager' },
          required: false,
        },
        // join clients
        {
          model: UserSchema,
          as: 'clients',
          where: { role: 'client' },
          required: false,
        },
      ],
    });

    if (companyObj === null) {
      return { isFind: false, object: null };
    }

    const newCompanyObj = formatCompanyObj(companyObj);

    return { isFind: true, object: newCompanyObj };
  }
}

CompanyModel.schema = CompanySchema;

module.exports = CompanyModel;
