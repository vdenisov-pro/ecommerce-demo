const joi = require('joi');
const { GET, PUT } = require('node-susanin/methods');
const ctrl = require('./address.controller');
const { MANAGER, ADMIN } = require('../../shared/user-roles');

module.exports = [
  {
    method: GET,
    path: '/addresses/:id',
    controller: ctrl.getOneById,
    validation: {
      params: {
        id: joi.number().integer().min(1).required(),
      },
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
  {
    method: PUT,
    path: '/addresses/:id',
    controller: ctrl.updateOneById,
    validation: {
      params: {
        id: joi.number().integer().min(1).required(),
      },
      body: {
        cityId: joi.number().integer().min(1).required(),
        companyId: joi.number().integer().min(1).required(),
        courierId: joi.number().integer().min(1).allow(null)
          .required(),
        street: joi.string().min(1).max(255).required(),
        house: joi.number().integer().min(1).required(),
        comment: joi.string().min(1).max(5000).allow(null)
          .required(),
      },
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
];
