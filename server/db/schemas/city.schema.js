const Sequelize = require('sequelize');
const sequelize = require('../../lib/sequelize');

const CitySchema = sequelize.define('City', {

  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  countryId: {
    allowNull: false,
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

module.exports = { CitySchema };
