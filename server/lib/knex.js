const knex = require('knex');
const config = require('config');

const knexConfig = config.get('knex');

const connection = knex(knexConfig);

module.exports = {
  knex: connection,
};
