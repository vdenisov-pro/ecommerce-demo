const Sequelize = require('sequelize');

module.exports = {

  up: (queryInterface) => queryInterface.changeColumn('OrderItem', 'orderId', {
    allowNull: false,
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    references: {
      model: 'Order',
      key: 'id',
    },
  }),

  down: (queryInterface) => queryInterface.changeColumn('OrderItem', 'orderId', {
    allowNull: false,
    type: Sequelize.INTEGER,
  }),

};
