module.exports = {

  up: (queryInterface) => queryInterface.renameColumn('Order', 'userId', 'authorId'),

  down: (queryInterface) => queryInterface.renameColumn('Order', 'authorId', 'userId'),

};
