const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => queryInterface.createTable('Management', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    managerId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    clientId: {
      allowNull: false,
      type: Sequelize.INTEGER,
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
  down: (queryInterface) => queryInterface.dropTable('Management'),
};
