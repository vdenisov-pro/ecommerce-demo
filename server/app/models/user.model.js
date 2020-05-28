const _ = require('lodash');
const { Op } = require('sequelize');

const { AbstractModel } = require('../shared');
const {
  UserSchema,
  AuthSchema,
  CompanySchema,
  ManagementSchema,
} = require('../../db/schemas');

const { modelHelper } = require('../shared');

const { userRoles } = require('../shared');

// Manager formatting

function formatManagerObj(managerObj) {
  const { ClientsForManager: clientList } = managerObj;

  const newClientList = _.map(clientList, (manageObj) => manageObj.client);

  return _.assign(
    _.omit(managerObj, ['ClientsForManager']),
    { clients: newClientList },
  );
}

// Client formatting

function formatClientObj(clientObj) {
  const { ManagerForClient: { managerId, manager } } = clientObj;

  return _.assign(
    _.omit(clientObj, ['ManagerForClient']),
    { managerId, manager },
  );
}

function formatClientList(clientList) {
  return _.map(clientList, ({ dataValues: clientObj }) => formatClientObj(clientObj));
}

class UserModel extends AbstractModel {
  static async findOrCreate(userData) {
    const [object, isNew] = await UserSchema.findOrCreate({
      where: {
        email: { $eq: userData.email },
      },
      defaults: userData,
    });

    return { object, isNew };
  }

  // FULL LIST
  static async getAll(offset, limit) {
    const { rows: userList, count } = await UserSchema.findAndCountAll({
      where: {},
      offset,
      limit,
    });

    return modelHelper.formatPagination(userList, count, offset, limit);
  }

  // ALL MANAGERS
  static async getAllManagers(offset, limit) {
    const { rows: managerList, count } = await UserSchema.findAndCountAll({
      where: { role: userRoles.MANAGER },
      offset,
      limit,
    });

    return modelHelper.formatPagination(managerList, count, offset, limit);
  }

  // ALL COURIERS
  static async getAllCouriers(offset, limit) {
    const { rows: courierList, count } = await UserSchema.findAndCountAll({
      where: { role: userRoles.COURIER },
      offset,
      limit,
    });

    return modelHelper.formatPagination(courierList, count, offset, limit);
  }

  // ALL CLIENTS
  static async getAllClients(offset, limit) {
    const { rows: clientList, count } = await UserSchema.findAndCountAll({
      where: { role: userRoles.CLIENT },
      offset,
      limit,
      include: [
        { model: CompanySchema, as: 'company' },

        {
          model: ManagementSchema,
          as: 'ManagerForClient',
          include: [
            { model: UserSchema, as: 'manager' },
          ],
        },
      ],
    });

    const newCLientList = formatClientList(clientList);

    return modelHelper.formatPagination(newCLientList, count, offset, limit);
  }

  // FILTERED BY NAME
  static async getFilteredBy(role, name, offset, limit, companyId) {
    const { rows: userList, count } = await UserSchema.findAndCountAll({
      where: {
        [Op.and]: [
          companyId && { companyId },
          role && { role },
          name && { name: { $like: `%${name}%` } },
        ],
      },
      offset,
      limit,
    });

    return modelHelper.formatPagination(userList, count, offset, limit);
  }

  // MANAGER
  static async findOneManagerById(userId) {
    const dbData = await UserSchema.findOne({
      where: {
        id: { $eq: userId },
      },
      include: [
        {
          model: ManagementSchema,
          as: 'ClientsForManager',
          include: [
            { model: UserSchema, as: 'client' },
          ],
        },
      ],
    });

    const { dataValues: managerObj } = dbData;
    const newManagerObj = formatManagerObj(managerObj);

    return (dbData === null)
      ? { isFind: false, object: null }
      : { isFind: true, object: newManagerObj };
  }

  // COURIER
  static async findOneCourierById(userId) {
    const dbData = await UserSchema.findOne({
      where: {
        id: { $eq: userId },
      },
    });

    return (dbData === null)
      ? { isFind: false, object: null }
      : { isFind: true, object: dbData };
  }

  // CLIENT
  static async findOneClientById(userId) {
    const dbData = await UserSchema.findOne({
      where: {
        id: { $eq: userId },
      },
      include: [
        { model: CompanySchema, as: 'company' },

        {
          model: ManagementSchema,
          as: 'ManagerForClient',
          include: [
            { model: UserSchema, as: 'manager' },
          ],
        },
      ],
    });

    const { dataValues: clientObj } = dbData;
    const newClientObj = formatClientObj(clientObj);

    return (dbData === null)
      ? { isFind: false, object: null }
      : { isFind: true, object: newClientObj };
  }

  static async findOneByIdWithAuth(userId) {
    const dbData = await UserSchema.findOne({
      where: {
        id: { $eq: userId },
      },
      include: [
        { model: AuthSchema, as: 'auth_info' },
      ],
    });

    return (dbData === null)
      ? { isFind: false, object: null }
      : { isFind: true, object: dbData };
  }
}

UserModel.schema = UserSchema;

module.exports = UserModel;
