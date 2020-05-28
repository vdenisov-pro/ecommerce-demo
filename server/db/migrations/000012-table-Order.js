const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => queryInterface.createTable('Order', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    addressId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },

    totalPrice: {
      allowNull: false,
      type: Sequelize.DOUBLE,
    },
    paymentMethod: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    needDocuments: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    },
    code: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    status: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    deliveryDate: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    deliveryTimeMin: {
      allowNull: false,
      type: Sequelize.TIME,
    },
    deliveryTimeMax: {
      allowNull: false,
      type: Sequelize.TIME,
    },
    deliveredAt: {
      allowNull: true,
      type: Sequelize.DATE,
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
  down: (queryInterface) => queryInterface.dropTable('Order'),
};
