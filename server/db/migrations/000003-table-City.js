
const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => queryInterface.createTable('City', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    countryId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },

    name: {
      allowNull: false,
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
  down: (queryInterface) => queryInterface.dropTable('City '),
};
