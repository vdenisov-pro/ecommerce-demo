const Sequelize = require('sequelize');
const sequelize = require('../../lib/sequelize');

const OrderSchema = sequelize.define('Order', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  authorId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },

  companyId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  legalPeopleId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  clientId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  managerId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  deliveryDate: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  addressId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  deliveryTimeMin: {
    allowNull: false,
    type: Sequelize.TIME,
  },
  deliveryTimeMax: {
    allowNull: false,
    type: Sequelize.TIME,
  },
  paymentMethod: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  needDocuments: {
    allowNull: false,
    type: Sequelize.BOOLEAN,
  },
  comment: {
    allowNull: true,
    type: Sequelize.TEXT,
  },
  status: {
    allowNull: true,
    type: Sequelize.TEXT,
  },
  price: {
    allowNull: false,
    type: Sequelize.DOUBLE,
  },
  discount: {
    allowNull: false,
    type: Sequelize.DOUBLE,
  },
  totalPrice: {
    allowNull: false,
    type: Sequelize.DOUBLE,
  },

  deliveredAt: {
    allowNull: true,
    type: Sequelize.DATE,
  },
}, {
  timestamps: true,
  freezeTableName: true,
});

module.exports = { OrderSchema };
