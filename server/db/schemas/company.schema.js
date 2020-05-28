const Sequelize = require('sequelize');
const sequelize = require('../../lib/sequelize');

const CompanySchema = sequelize.define('Company', {

  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },

  name: {
    allowNull: false,
    type: Sequelize.TEXT,
  },

}, {
  timestamps: true,
  freezeTableName: true,
});

module.exports = { CompanySchema };
