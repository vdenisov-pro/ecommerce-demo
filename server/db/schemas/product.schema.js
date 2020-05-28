const Sequelize = require('sequelize');
const sequelize = require('../../lib/sequelize');

const ProductSchema = sequelize.define('Product', {

  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  categoryId: {
    allowNull: false,
    type: Sequelize.INTEGER,
    references: {
      model: 'Category',
      key: 'id',
    },
  },

  name: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  description: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  producer: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  producerCountry: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  code: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  portionNumber: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  portionWeight: {
    allowNull: false,
    type: Sequelize.FLOAT,
  },
  portionPrice: {
    allowNull: false,
    type: Sequelize.DOUBLE,
  },
  boxType: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  boxWeight: {
    allowNull: false,
    type: Sequelize.FLOAT,
  },
  boxPrice: {
    allowNull: false,
    type: Sequelize.DOUBLE,
  },

}, {
  timestamps: true,
  freezeTableName: true,
});

module.exports = { ProductSchema };
