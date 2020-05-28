
const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => queryInterface.createTable('Address', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    cityId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    companyId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    courierId: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },

    street: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    house: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    comment: {
      type: Sequelize.STRING,
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
  down: (queryInterface) => queryInterface.dropTable('Address'),
};
