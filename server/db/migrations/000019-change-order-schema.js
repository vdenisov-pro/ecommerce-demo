module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.sequelize.transaction((t) => Promise.all([
      queryInterface.removeColumn(
        'Order',
        'code',
        { transaction: t },
      ),
      queryInterface.addColumn(
        'Order',
        'companyId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Company',
            key: 'id',
          },
        },
        { transaction: t },
      ),

      queryInterface.addColumn(
        'Order',
        'legalPeopleId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'LegalPerson',
            key: 'id',
          },
        },
        { transaction: t },
      ),

      queryInterface.addColumn(
        'Order',
        'managerId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'User',
            key: 'id',
          },
        },
        { transaction: t },
      ),

      queryInterface.addColumn(
        'Order',
        'clientId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'User',
            key: 'id',
          },
        },
        { transaction: t },
      ),

      queryInterface.addColumn(
        'Order',
        'comment',
        {
          type: Sequelize.TEXT,
        },
        { transaction: t },
      ),

      queryInterface.addColumn(
        'Order',
        'price',
        {
          type: Sequelize.DOUBLE,
        },
        { transaction: t },
      ),

      queryInterface.addColumn(
        'Order',
        'discount',
        {
          type: Sequelize.DOUBLE,
        },
        { transaction: t },
      ),

      queryInterface.addColumn(
        'OrderItem',
        'productDiscount',
        {
          type: Sequelize.DOUBLE,
        },
        { transaction: t },
      ),
    ]))
  ),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => (
    Promise.all([
      queryInterface.addColumn(
        'Order',
        'code',
        {
          type: Sequelize.TEXT,
        },
        { transaction },
      ),
      queryInterface.removeColumn(
        'Order',
        'companyId',
        { transaction },
      ),

      queryInterface.removeColumn(
        'Order',
        'legalPeopleId',
        { transaction },
      ),

      queryInterface.removeColumn(
        'Order',
        'managerId',
        { transaction },
      ),

      queryInterface.removeColumn(
        'Order',
        'clientId',
        { transaction },
      ),

      queryInterface.removeColumn(
        'Order',
        'comment',
        { transaction },
      ),

      queryInterface.removeColumn(
        'Order',
        'price',
        { transaction },
      ),

      queryInterface.removeColumn(
        'Order',
        'discount',
        { transaction },
      ),

      queryInterface.removeColumn(
        'OrderItem',
        'productDiscount',
        { transaction },
      ),
    ]))),
};
