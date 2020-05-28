const Sequelize = require('sequelize');
const config = require('config');

const { Op } = Sequelize;

const {
  database, username, password, ...options
} = config.get('sequelize');
const operatorsAliases = {
  $eq: Op.eq,
  $and: Op.and,
  $or: Op.or,
  $like: Op.like,
  $notIn: Op.notIn,
};

const connection = new Sequelize(
  database, username, password,
  {
    ...options,
    operatorsAliases,
  },
);

module.exports = connection;
