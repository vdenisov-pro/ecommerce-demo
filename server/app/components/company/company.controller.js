const {
  map,
  mergeLeft,
  differenceWith,
  prop,
  pipe,
  partition,
  filter,
  propEq,
} = require('ramda');
const {
  COMPANY_ALREADY_EXIST,
  LEGAL_PERSON_ALREADY_EXIST,
} = require('../../../lib/errors');

const { handlerFor, userRoles } = require('../../shared');
const {
  CompanyModel,
  CountryModel,
  CityModel,
  AddressModel,
  LegalPersonModel,
  UserModel,
} = require('../../models');

const cmp = (x, y) => (
  x.companyId === y.companyId
  && x.type === y.type
  && x.name === y.name
  && x.personDetails === y.personDetails
);

const companyDifference = differenceWith(cmp);

// [POST] Company => create new
module.exports.createNew = async ({
  body: {
    name,
    managerId,
  },
  res,
  error,
}) => {
  try {
    // STEP 1: create company
    const {
      object: companyObj,
    } = await CompanyModel.createNew({ name });

    // STEP 2: update manager
    await UserModel.updateOneById(managerId, { companyId: companyObj.id });
    // await UserModel.updateOneById(managerId, { companyId: companyObj.id, role: 'manager' });

    // STEP 3: get company with joins
    const {
      object: newCompanyObj,
      isFind: companyFounded,
    } = await CompanyModel.findOneById(companyObj.id);

    return (companyFounded)
      ? handlerFor.SUCCESS_ONE(res, 201, { ...newCompanyObj.dataValues, managerId })
      : handlerFor.ERROR_NOT_FOUND(res, 'company not found in database !');
    // return handlerFor.SUCCESS_ONE(res, 201, { ...newCompanyObj.toJSON(), managerId });
  } catch (err) {
    if (err.original && err.original.constraint === 'company_name_uindex') {
      return error(COMPANY_ALREADY_EXIST());
    }
    return error(err);
  }
};

module.exports.editAdresses = async ({
  params: { id: companyId },
  body: {
    addresses,
  },
  res,
  error,
}) => {
  try {
    // STEP 2: save all addresses
    const promises = addresses.map(async (address) => {
      try {
        // STEP 2.1: find or create country
        const {
          object: countryObj,
        } = await CountryModel.findOneOrCreate({
          name: address.country,
        });

        // STEP 2.2: find or create city
        const {
          object: cityObj,
        } = await CityModel.findOneOrCreate({
          countryId: countryObj.id,
          name: address.city,
        });

        // STEP 2.3: find or create address
        return AddressModel.findOneOrCreate({
          cityId: cityObj.id,
          companyId,

          street: address.street,
          house: address.house,
          comment: address.comment,
          courierId: address.courierId,
        });
      } catch (err) {
        throw new Error(err);
      }
    });

    const results = await Promise.all(promises);
    const createdAddresses = map((address) => address.object.toJSON(), results);

    const { results: deletedAddresses } = await AddressModel.getAll({
      companyId,
      id: { $notIn: [...map(prop('id'), createdAddresses)] },
    });

    const deleteIds = map(pipe((address) => address.toJSON(), prop('id')), deletedAddresses);

    await Promise.all(deleteIds.map((id) => AddressModel.deleteOneById(id)));

    return handlerFor.SUCCESS_ONE(res, 201, { companyId, addresses });
  } catch (err) {
    return error(err);
  }
};

module.exports.editLegalPersons = async ({
  params: { id: companyId },
  body: {
    legalPeople,
  },
  res,
  error,
}) => {
  try {
    const newLegalPersons = map(mergeLeft({ companyId }), legalPeople);
    const { results } = await LegalPersonModel
      .getAll({ companyId });

    const currentLegalPersons = map((legalPerson) => legalPerson.toJSON(), results);
    const deleteLegalPersons = companyDifference(currentLegalPersons, newLegalPersons);
    const [updateLegalPersons, addLegalPersons] = partition(
      filter(propEq('companyId', companyId)),
      companyDifference(newLegalPersons, currentLegalPersons),
    );

    // TODO: rewrite to delete WHERE IN ([ids])
    const deleteRequests = deleteLegalPersons.map(({ id }) => LegalPersonModel.deleteOneById(id));

    const updates = await Promise.all(updateLegalPersons
      .map((legalPerson) => LegalPersonModel.findOneOrCreate(legalPerson)));

    const existLegalPerson = updates.find(({ isNew }) => !isNew);

    if (existLegalPerson) {
      error(LEGAL_PERSON_ALREADY_EXIST());
    }

    await LegalPersonModel.createSeveral(addLegalPersons);

    await Promise.all(deleteRequests);

    return handlerFor.SUCCESS_ONE(res, 201, { companyId, legalPeople });
  } catch (err) {
    if (err.original.constraint === 'legalperson_type_name_uindex') {
      error(LEGAL_PERSON_ALREADY_EXIST());
    }
    return error(err);
  }
};

// [GET] Company => get all
module.exports.getAll = async ({
  query: {
    offset,
    limit,
  },
  res,
  error,
}) => {
  try {
    const {
      results, count, previous, next,
    } = await CompanyModel.getAll(
      offset,
      limit,
    );
    return handlerFor.SUCCESS_ALL(res, 200, results, count, previous, next);
  } catch (err) {
    return error(err);
  }
};

// [GET] Company => get filtered for autocomplete
module.exports.searchBy = async ({
  query: {
    name,
    offset,
    limit,
  },
  res,
  error,
}) => {
  try {
    const {
      results, count, previous, next,
    } = await CompanyModel.getFilteredBy(
      name,
      offset,
      limit,
    );
    return handlerFor.SUCCESS_ALL(res, 200, results, count, previous, next);
  } catch (err) {
    return error(err);
  }
};

// [GET] Company => get one (by id)
module.exports.getOneById = async ({
  params: { id: companyId },
  res,
}) => {
  try {
    const {
      object: companyObj,
      isFind: companyFounded,
    } = await CompanyModel.findOneById(companyId);

    return (companyFounded)
      ? handlerFor.SUCCESS_ONE(res, 200, companyObj.dataValues)
      : handlerFor.ERROR_NOT_FOUND(res, 'company not found in database !');
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [PUT] Company => update one (by id)
module.exports.updateOneById = async ({
  params: { id: companyId },
  body: {
    managerId,
    name,
  },
  res,
}) => {
  try {
    // STEP 1: update company
    const {
      object: companyObj,
      isUpdate: companyUpdated,
    } = await CompanyModel.updateOneById(companyId, { name });

    // STEP 2: update manager
    await UserModel.updateOneById(managerId, { companyId: companyObj.id });
    // await UserModel.updateOneById(managerId, { companyId: companyObj.id, role: 'manager' });

    // STEP 3: get company with joins
    const {
      object: newCompanyObj,
      isFind: companyFounded,
    } = await CompanyModel.findOneById(companyObj.id);

    return (companyUpdated && companyFounded)
      ? handlerFor.SUCCESS_ONE(res, 200, { ...newCompanyObj.dataValues, managerId })
      : handlerFor.ERROR_NOT_FOUND(res, 'company not found in database !');
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

// [DELETE] Company => delete one (by id)
module.exports.deleteOneById = async ({
  params: { id: companyId },
  res,
}) => {
  try {
    const {
      isDelete: companyDeleted,
    } = await CompanyModel.deleteOneById(companyId);

    return (companyDeleted)
      ? handlerFor.SUCCESS_ONE(res, 200)
      : handlerFor.ERROR_NOT_FOUND(res, 'company not found in database !');
  } catch (err) {
    return handlerFor.ERROR(res, err);
  }
};

module.exports.searchLegalPeople = async ({
  params: { id: companyId },
  query: {
    name,
    offset,
    limit,
  },
  res,
  error,
}) => {
  try {
    const {
      results, count, previous, next,
    } = await LegalPersonModel.getFilteredBy(
      companyId,
      name,
      offset,
      limit,
    );
    return handlerFor.SUCCESS_ALL(res, 200, results, count, previous, next);
  } catch (err) {
    return error(err);
  }
};

module.exports.searchAddresses = async ({
  params: { id: companyId },
  query: {
    q,
    offset,
    limit,
  },
  res,
  error,
}) => {
  try {
    const {
      results, count, previous, next,
    } = await AddressModel.getFilteredBy(
      companyId,
      q,
      offset,
      limit,
    );
    return handlerFor.SUCCESS_ALL(res, 200, results, count, previous, next);
  } catch (err) {
    return error(err);
  }
};

module.exports.searchManagers = async ({
  params: { id: companyId },
  query: {
    name,
    offset,
    limit,
  },
  res,
  error,
}) => {
  try {
    const {
      results, count, previous, next,
    } = await UserModel.getFilteredBy(
      userRoles.MANAGER,
      name,
      offset,
      limit,
      companyId,
    );
    return handlerFor.SUCCESS_ALL(res, 200, results, count, previous, next);
  } catch (err) {
    return error(err);
  }
};

module.exports.searchClients = async ({
  params: { id: companyId },
  query: {
    name,
    offset,
    limit,
  },
  res,
  error,
}) => {
  try {
    const {
      results, count, previous, next,
    } = await UserModel.getFilteredBy(
      userRoles.CLIENT,
      name,
      offset,
      limit,
      companyId,
    );
    return handlerFor.SUCCESS_ALL(res, 200, results, count, previous, next);
  } catch (err) {
    return error(err);
  }
};
