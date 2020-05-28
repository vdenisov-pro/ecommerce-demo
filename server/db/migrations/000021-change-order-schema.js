module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.sequelize.transaction((t) => Promise.all([

      queryInterface.changeColumn(
        'Order',
        'legalPeopleId',
        {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        { transaction: t },
      ),

      queryInterface.changeColumn(
        'Order',
        'deliveryDate',
        {
          allowNull: true,
          type: Sequelize.DATEONLY,
        },
        { transaction: t },
      ),

      queryInterface.changeColumn(
        'Order',
        'addressId',
        {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        { transaction: t },
      ),

    ]))
  ),

  down: (queryInterface, Sequelize) => (
    queryInterface.sequelize.transaction((t) => Promise.all([

      queryInterface.changeColumn(
        'Order',
        'legalPeopleId',
        {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        { transaction: t },
      ),

      queryInterface.changeColumn(
        'Order',
        'deliveryDate',
        {
          allowNull: false,
          type: Sequelize.DATEONLY,
        },
        { transaction: t },
      ),

      queryInterface.changeColumn(
        'Order',
        'addressId',
        {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        { transaction: t },
      ),

    ]))
  ),
};
