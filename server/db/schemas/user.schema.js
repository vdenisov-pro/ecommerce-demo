const Sequelize = require('sequelize');
const sequelize = require('../../lib/sequelize');

const UserSchema = sequelize.define('User', {

  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  companyId: {
    type: Sequelize.INTEGER,
  },

  role: {
    type: Sequelize.TEXT,
  },
  status: {
    type: Sequelize.TEXT,
  },

  email: {
    allowNull: false,
    unique: true,
    type: Sequelize.TEXT,
  },
  password: {
    type: Sequelize.TEXT,
  },

  name: {
    type: Sequelize.TEXT,
  },
  phone: {
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.TEXT,
  },

}, {
  timestamps: true,
  freezeTableName: true,
});

module.exports = { UserSchema };
