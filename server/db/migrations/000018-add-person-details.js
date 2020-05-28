const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => queryInterface.addColumn(
    'LegalPerson',
    'personDetails',
    Sequelize.TEXT,
  ),

  down: (queryInterface) => queryInterface.removeColumn(
    'LegalPerson',
    'personDetails',
  ),
};
