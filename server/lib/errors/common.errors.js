module.exports = [
  {
    name: 'NOT_FOUND',
    status: 404,
    message: 'The requested URL was not found on this server',
  },
  {
    name: 'UNEXPECTED',
    status: 500,
    message: 'Unexpected error',
  },
  {
    name: 'FORBIDDEN',
    status: 403,
    message: 'You have not enough rules',
  },
  {
    name: 'VALIDATION',
    status: 400,
    message: 'Validation error',
  },
  {
    name: 'INVALID_TOKEN',
    status: 498,
    message: 'JWT token is invalid',
  },
  {
    name: 'ERROR_ACCESS',
    status: 401,
    message: 'Valid firebase token required !',
  },
  {
    name: 'ERROR_USER_AUTH',
    status: 401,
    message: 'Такой сессии нет в нашей базе',
  },
];
