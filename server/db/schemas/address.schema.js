const Sequelize = require('sequelize');
const sequelize = require('../../lib/sequelize');

const AddressSchema = sequelize.define('Address', {

  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  cityId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  companyId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  courierId: {
    allowNull: true,
    type: Sequelize.INTEGER,
  },

  street: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  house: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  comment: {
    type: Sequelize.TEXT,
  },

}, {
  timestamps: true,
  freezeTableName: true,
});

module.exports = { AddressSchema };
