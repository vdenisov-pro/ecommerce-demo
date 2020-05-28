const Sequelize = require('sequelize');
const sequelize = require('./../../lib/sequelize');

const ImageSchema = sequelize.define('Image', {

  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  productId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },

  original: Sequelize.TEXT,
  xsmall: Sequelize.TEXT,
  small: Sequelize.TEXT,
  medium: Sequelize.TEXT,
  large: Sequelize.TEXT,

}, {
  timestamps: true,
  freezeTableName: true,
});

module.exports = { ImageSchema };
