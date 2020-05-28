const log4js = require('log4js');
const config = require('config');
const { DateTime } = require('luxon');

const LOGGERS_CONFIGS = config.get('logger.namespaces');
const DEFAULT_LEVEL = config.get('logger.namespaces.default.level').toLocaleLowerCase();
const loggerFilename = `${DateTime.utc().toFormat('dd-LL-yyyy-HH:mm:ss')}_${process.env.NODE_ENV}.log`;

const log = log4js.getLogger('logger-module');

log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: {
      type: 'file',
      filename: `./logs/${loggerFilename}`,
      maxLogSize: 10 * 1024 * 1024,
    },
  },
  categories: {
    default: { appenders: ['console', 'file'], level: 'error' },
  },
});

const createLogger = (namespace) => {
  const loggerNamespace = namespace.toLocaleLowerCase();

  if (loggerNamespace === DEFAULT_LEVEL) {
    log.warn('Can\'t use the name "default", because it is reserved');
  }

  const logger = log4js.getLogger(loggerNamespace);
  const loggerConfig = LOGGERS_CONFIGS[loggerNamespace];
  const level = loggerConfig ? loggerConfig.level.toLowerCase() : DEFAULT_LEVEL;

  logger.level = level;

  return logger;
};

module.exports = { createLogger };
