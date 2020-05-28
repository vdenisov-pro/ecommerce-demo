module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.sequelize.transaction((t) => Promise.all([

      queryInterface.changeColumn(
        'User',
        'name',
        {
          allowNull: true,
          type: Sequelize.STRING,
        },
        { transaction: t },
      ),

      queryInterface.changeColumn(
        'User',
        'phone',
        {
          allowNull: true,
          unique: true,
          type: Sequelize.STRING,
        },
        { transaction: t },
      ),

      queryInterface.changeColumn(
        'User',
        'password',
        {
          allowNull: true,
          type: Sequelize.STRING,
        },
        { transaction: t },
      ),

    ]))
  ),

  down: (queryInterface, Sequelize) => (
    queryInterface.sequelize.transaction((t) => Promise.all([

      queryInterface.changeColumn(
        'User',
        'name',
        {
          allowNull: true,
          type: Sequelize.STRING,
        },
        { transaction: t },
      ),

      queryInterface.changeColumn(
        'User',
        'phone',
        {
          allowNull: true,
          unique: true,
          type: Sequelize.STRING,
        },
        { transaction: t },
      ),

      queryInterface.changeColumn(
        'User',
        'password',
        {
          allowNull: true,
          type: Sequelize.STRING,
        },
        { transaction: t },
      ),

    ]))
  ),
};
