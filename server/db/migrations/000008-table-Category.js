
const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => queryInterface.createTable('Category', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    name: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    enabled: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
  down: (queryInterface) => queryInterface.dropTable('Category'),
};
