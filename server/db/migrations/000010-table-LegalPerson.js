
const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => queryInterface.createTable('LegalPerson', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    companyId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },

    type: {
      allowNull: false,
      type: Sequelize.STRING,
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
  down: (queryInterface) => queryInterface.dropTable('LegalPerson'),
};
