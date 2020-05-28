
const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => queryInterface.createTable('User', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    companyId: {
      type: Sequelize.INTEGER,
    },

    role: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },

    email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },

    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    phone: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    description: {
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
  down: (queryInterface) => queryInterface.dropTable('User'),
};
