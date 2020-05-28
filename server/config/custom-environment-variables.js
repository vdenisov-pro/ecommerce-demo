module.exports = {
  sequelize: {
    host: 'DATABASE_HOST',
    port: 'DATABASE_PORT',
    database: 'DATABASE_NAME',
    username: 'DATABASE_USER',
    password: 'DATABASE_PASSWORD',
  },
  knex: {
    client: 'pg',
    connection: {
      host: 'DATABASE_HOST',
      port: 'DATABASE_PORT',
      user: 'DATABASE_USER',
      password: 'DATABASE_PASSWORD',
      database: 'DATABASE_NAME',
    },
  },
};
