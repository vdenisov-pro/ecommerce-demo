const config = require('config');
const firebase = require('firebase');
const admin = require('firebase-admin');
const { createLogger } = require('../logger');

const log = createLogger('firebase');

const { appConfig, accountKey } = config.get('firebase');

const firebaseApp = firebase.initializeApp(appConfig);

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(accountKey),
  databaseURL: appConfig.databaseURL,
});

log.info(`* firebase -> (appConfig).projectId = "${appConfig.projectId}"`);

log.info(`* firebase -> (accountKey).project_id = "${accountKey.project_id}"`);

module.exports = {
  firebaseApp,
  firebaseAdmin,
};
