const Sequelize = require('sequelize');

module.exports = {

  up: (queryInterface) => queryInterface.changeColumn('Product', 'categoryId', {
    allowNull: false,
    type: Sequelize.INTEGER,
    references: {
      model: 'Category',
      key: 'id',
    },
  }),

  down: (queryInterface) => queryInterface.changeColumn('Product', 'categoryId', {
    allowNull: false,
    type: Sequelize.INTEGER,
  }),

};
