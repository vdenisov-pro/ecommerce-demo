const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => queryInterface.createTable('OrderItem', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    orderId: {
      allowNull: false,
      type: Sequelize.INTEGER,
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
    itemPrice: {
      allowNull: false,
      type: Sequelize.DOUBLE,
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },

  }),
  down: (queryInterface) => queryInterface.dropTable('OrderItem'),
};
