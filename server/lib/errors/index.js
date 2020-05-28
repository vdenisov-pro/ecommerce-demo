const stringHash = require('string-hash');
const bulk = require('bulk-require');

const errorFunctions = {};

const errorWrapper = (code, status, message, info) => {
  const error = { code, status, message };

  if (info) {
    Object.assign(error, { info });
  }

  return error;
};

const defineOne = ({
  name,
  status,
  message,
}) => {
  const code = stringHash(name) % 999999;
  const errorFunction = errorWrapper.bind(null, code, status, message);

  errorFunctions[name] = errorFunction;
};

/* Import errors */
Object
  .values(bulk(__dirname, ['*.errors.js']))
  .reduce((acc, val) => acc.concat(val))
  .forEach(defineOne);

module.exports = errorFunctions;
