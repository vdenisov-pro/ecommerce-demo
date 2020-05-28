const config = require('config');
const joi = require('joi');
const {
  GET,
  POST,
  PUT,
  DELETE,
} = require('node-susanin/methods');
const ctrl = require('./category.controller');
const { MANAGER, ADMIN } = require('../../shared/user-roles');

const {
  offset: defaultOffset,
  limit: defaultLimit,
} = config.get('pagination');

module.exports = [
  {
    method: GET,
    path: '/categories',
    controller: ctrl.getAll,
    validation: {
      query: {
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
    path: '/categories/:id',
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
    method: POST,
    path: '/categories',
    controller: ctrl.createNew,
    validation: {
      body: {
        name: joi.string().min(1).max(255).required(),
        description: joi.string().min(1).max(5000).required(),
        enabled: joi.boolean(),
      },
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
  {
    method: PUT,
    path: '/categories/:id',
    controller: ctrl.updateOneById,
    validation: {
      params: {
        id: joi.number().integer().min(1).required(),
      },
      body: {
        name: joi.string().min(1).max(255).required(),
        description: joi.string().min(1).max(5000).required(),
        enabled: joi.boolean().required(),

        // omit this props
        id: joi.number().integer().min(1),
        createdAt: joi.date().iso(),
        updatedAt: joi.date().iso(),
      },
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
  {
    method: DELETE,
    path: '/categories/:id',
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
