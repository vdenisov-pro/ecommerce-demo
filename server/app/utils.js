const {
  map,
  reject,
  type,
  __,
  equals,
  pipe,
} = require('ramda');

const instanceToJSON = (instance) => (
  instance
    ? instance.toJSON()
    : null
);

const dbDataToJson = (dbData) => {
  if (Array.isArray(dbData)) {
    return map(instanceToJSON, dbData);
  }
  return instanceToJSON(dbData);
};

const rejectUndefined = reject(pipe(type(__), equals('Undefined')));

module.exports = {
  dbDataToJson,
  rejectUndefined,
};
