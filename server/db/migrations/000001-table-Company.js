const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => queryInterface.createTable('Company', {

    id: {
      autoIncrement: true,
      primaryKey: true,
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
  down: (queryInterface) => queryInterface.dropTable('Company'),
};
