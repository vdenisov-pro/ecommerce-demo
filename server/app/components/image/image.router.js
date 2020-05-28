const config = require('config');
const joi = require('joi');
const {
  GET,
  DELETE,
} = require('node-susanin/methods');
const ctrl = require('./image.controller');
const { MANAGER, ADMIN } = require('../../shared/user-roles');

const {
  offset: defaultOffset,
  limit: defaultLimit,
} = config.get('pagination');

module.exports = [
  {
    method: GET,
    path: '/images',
    controller: ctrl.getAll,
    validation: {
      query: {
        productId: joi.number().integer().min(1),
        offset: joi.number().integer().min(0).default(defaultOffset),
        limit: joi.number().integer().min(0).default(defaultLimit),
      },
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
  {
    method: GET,
    path: '/images/:id',
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
    method: DELETE,
    path: '/images/:id',
    controller: ctrl.deleteOneById,
    validation: {
      params: {
        id: joi.number().integer().min(1).required(),
      },
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
];
