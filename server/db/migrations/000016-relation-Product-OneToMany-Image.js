const Sequelize = require('sequelize');

module.exports = {

  up: (queryInterface) => queryInterface.changeColumn('Image', 'productId', {
    allowNull: false,
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    references: {
      model: 'Product',
      key: 'id',
    },
  }),

  down: (queryInterface) => queryInterface.changeColumn('Image', 'productId', {
    allowNull: false,
    type: Sequelize.INTEGER,
  }),

};
