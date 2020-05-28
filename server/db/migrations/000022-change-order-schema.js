module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.sequelize.transaction((t) => Promise.all([

      queryInterface.changeColumn(
        'Order',
        'deliveryDate',
        {
          allowNull: false,
          type: Sequelize.DATE,
        },
        { transaction: t },
      ),

    ]))
  ),

  down: (queryInterface, Sequelize) => (
    queryInterface.sequelize.transaction((t) => Promise.all([

      queryInterface.changeColumn(
        'Order',
        'deliveryDate',
        {
          allowNull: false,
          type: Sequelize.DATEONLY,
        },
        { transaction: t },
      ),

    ]))
  ),
};
