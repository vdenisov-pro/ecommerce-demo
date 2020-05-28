const joi = require('joi');
const { POST } = require('node-susanin/methods');
const ctrl = require('./auth.controller');
const { MANAGER, EVERYONE, ALL } = require('../../shared/user-roles');

module.exports = [
  {
    method: POST,
    path: '/auth/login',
    controller: ctrl.login,
    validation: {
      body: joi.object({
        role: joi.string().equal(ALL).default(MANAGER),
        email: joi.string().min(1).max(255).required(),
        password: joi.string().min(1).max(255).required(),
      }),
    },
    middlewaresProps: {
      allowAccess: [EVERYONE],
    },
  },
];
