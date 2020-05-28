const Sequelize = require('sequelize');
const sequelize = require('../../lib/sequelize');

const AuthSchema = sequelize.define('Auth', {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  firebaseUID: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  databaseUID: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },

}, {
  timestamps: true,
  freezeTableName: true,
});

module.exports = { AuthSchema };
