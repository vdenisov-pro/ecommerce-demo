const Sequelize = require('sequelize');
const sequelize = require('../../lib/sequelize');

const ManagementSchema = sequelize.define('Management', {

  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  managerId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  clientId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },

}, {
  timestamps: true,
  freezeTableName: true,
});

module.exports = { ManagementSchema };
