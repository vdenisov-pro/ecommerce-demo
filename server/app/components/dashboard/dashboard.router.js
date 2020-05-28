const joi = require('joi');
const {
  GET,
} = require('node-susanin/methods');
const ctrl = require('./dashboard.controller');
const { MANAGER, ADMIN } = require('../../shared/user-roles');

module.exports = [
  {
    method: GET,
    path: '/dashboard/rating',
    controller: ctrl.getManagerRating,
    validation: {
      query: {
        managerId: joi.number().integer().min(1),
        from: joi.string().isoDate(),
        to: joi.string().isoDate(),
      },
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
];
