const Sequelize = require('sequelize');
const sequelize = require('../../lib/sequelize');

const CategorySchema = sequelize.define('Category', {

  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },

  name: {
    allowNull: false,
    unique: true,
    type: Sequelize.TEXT,
  },
  description: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  enabled: {
    allowNull: true,
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },

}, {
  timestamps: true,
  freezeTableName: true,
});

module.exports = { CategorySchema };
