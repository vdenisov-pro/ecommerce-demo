const app = require('express')();
const cors = require('cors');
const config = require('config');
const bodyParser = require('body-parser');
const Sentry = require('@sentry/node');

const { router } = require('../lib/router');
const {
  errorEndpoint,
  handleError,
} = require('../lib/api-endpoint');

const sentryOptions = config.get('sentry');

Sentry.init({
  dsn: sentryOptions.dsn,
});

app.use(Sentry.Handlers.requestHandler({
  user: sentryOptions.userProps,
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => res.status(200).send('Welcome to API !!!'));

app.use('/api', router);

app.use(handleError);

app.use(Sentry.Handlers.errorHandler({
  shouldHandleError(error) {
    return error.status >= 400;
  },
}));

app.use(errorEndpoint);


module.exports = app;
