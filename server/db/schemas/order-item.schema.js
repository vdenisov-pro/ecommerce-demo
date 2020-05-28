const Sequelize = require('sequelize');
const sequelize = require('../../lib/sequelize');

const OrderItemSchema = sequelize.define('OrderItem', {

  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  orderId: {
    allowNull: false,
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    references: {
      model: 'Order',
      key: 'id',
    },
  },
  productId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },

  productNumber: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  productPrice: {
    allowNull: false,
    type: Sequelize.DOUBLE,
  },
  productDiscount: {
    allowNull: false,
    type: Sequelize.DOUBLE,
  },
  itemPrice: {
    allowNull: false,
    type: Sequelize.DOUBLE,
  },

}, {
  timestamps: true,
  freezeTableName: true,
});

module.exports = { OrderItemSchema };
