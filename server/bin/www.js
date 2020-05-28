const config = require('config');

const app = require('../app/main.js');
const { createLogger } = require('../lib/logger');
const jobCreateRootUser = require('../jobs/create-root-user');


const MODE = config.util.getEnv('NODE_ENV');
const { port: PORT } = config.get('server');

const log = createLogger('bin-www');

const {
  username: DB_USER,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
} = config.get('sequelize');

const DB_URL = `postgres://${DB_USER}:******@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

app.listen(PORT, async () => {
  log.info(`\n ===> "${MODE}" mode <=== \n`);
  log.info(`* app => listening on port ${PORT}!`);
  log.info(`* database => ${DB_URL}`);

  await jobCreateRootUser()
    .then(() => log.info('\n => job "init root user" completed !'));
});
