
const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => queryInterface.createTable('Image', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    productId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },

    original: Sequelize.STRING,
    xsmall: Sequelize.STRING,
    small: Sequelize.STRING,
    medium: Sequelize.STRING,
    large: Sequelize.STRING,

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },

  }),
  down: (queryInterface) => queryInterface.dropTable('Image'),
};
