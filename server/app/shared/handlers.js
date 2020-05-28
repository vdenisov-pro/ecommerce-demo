module.exports.SUCCESS_ALL = (
  res,
  status,
  results = null,
  count = 0,
  previous = 0,
  next = 0,
) => {
  const responseObj = {
    results,
    count,
    previous,
    next,
  };

  return res.status(status).json(responseObj);
};

module.exports.SUCCESS_ONE = (res, status, result = {}) => res.status(status).json(result);

module.exports.STOPPER = (res) => res.status(200).send('All is okay ;)');

module.exports.ERROR_ON_VALIDATION = (res, message) => res.status(400).json({ message });

module.exports.ERROR_NOT_FOUND = (res, message) => res.status(404).json({ message });

module.exports.ERROR_ON_UPLOADING = (res, message) => res.status(422).json({ message });

module.exports.ERROR_ACCESS = (res, message) => res.status(401).json({ message });

module.exports.ERROR = (res, err) => res.status(500).json({
  error: (err.original) ? (err.original.detail) : (err.message || err.name),
});
