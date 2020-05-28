const Sequelize = require('sequelize');
const sequelize = require('../../lib/sequelize');

const LegalPersonSchema = sequelize.define('LegalPerson', {

  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  companyId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },

  type: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  name: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  personDetails: {
    type: Sequelize.TEXT,
  },

}, {
  timestamps: true,
  freezeTableName: true,
});

module.exports = { LegalPersonSchema };
