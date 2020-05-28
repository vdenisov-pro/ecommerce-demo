const { UNKNOWN_ERROR } = require('node-susanin/symbols');

const { createLogger } = require('../logger');

const {
  UNEXPECTED,
  VALIDATION,
} = require('../errors');

const log = createLogger('apiEndpoint');

const handleError = (err, req, res, next) => {
  let error = err;
  if (err === UNKNOWN_ERROR) {
    const { stack } = err;

    error = UNEXPECTED(stack);
  }

  if (!err.status || !err.code) {
    const { stack } = err;

    error = UNEXPECTED(stack);
  }

  if (err.isJoi) {
    error = VALIDATION(err);
  }

  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorEndpoint = (err, req, res, next) => {
  const httpMethod = req.method.toUpperCase();
  const isGetQuery = httpMethod === 'get';
  const incomeData = JSON.stringify(isGetQuery ? req.query : req.body);

  const { code, message, info } = err;
  const response = {
    code,
    message,
    info,
  };

  log.error(`${httpMethod} ${req.path}
  status: ${err.status}, code: ${err.code}, info: ${err.info || err.message}\n Income data: ${incomeData}`);

  res.status(err.status).json(response);
};

module.exports = {
  errorEndpoint,
  handleError,
};
