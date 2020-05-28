const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => queryInterface.createTable('Product', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    categoryId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },

    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    producer: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    producerCountry: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    code: {
      allowNull: false,
      type: Sequelize.STRING,
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
      type: Sequelize.STRING,
    },
    boxWeight: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    boxPrice: {
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
  down: (queryInterface) => queryInterface.dropTable('Product'),
};
