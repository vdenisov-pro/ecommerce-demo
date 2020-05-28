module.exports = {
  sequelize: {
    database: '*****',
    username: '*****',
    password: '*****',
    host: '*****',
    port: 5432,
    dialect: 'postgres',
  },
  knex: {
    client: 'pg',
    connection: {
      host: '*****',
      port: 5432,
      user: '*****',
      password: '*****',
      database: '*****',
    },
  },
  firebase: {
    appConfig: {
      apiKey: '*****',
      authDomain: '*****',
      databaseURL: '*****',
      projectId: '*****',
      storageBucket: '*****',
      messagingSenderId: '*****',
      appId: '*****',
    },
    accountKey: {
      type: '*****',
      project_id: '*****',
      private_key_id: '*****',
      private_key: '*****',
      client_email: '*****',
      client_id: '*****',
      auth_uri: '*****',
      token_uri: '*****',
      auth_provider_x509_cert_url: '*****',
      client_x509_cert_url: '*****',
    },
  },
};
