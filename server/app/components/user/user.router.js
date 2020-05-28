const config = require('config');
const joi = require('joi');
const {
  GET,
  POST,
  PUT,
  DELETE,
} = require('node-susanin/methods');
const ctrl = require('./user.controller');
const {
  ALL,
  ADMIN,
  MANAGER,
  CLIENT,
} = require('../../shared/user-roles');

const {
  offset: defaultOffset,
  limit: defaultLimit,
} = config.get('pagination');

module.exports = [
  {
    method: GET,
    path: '/users',
    controller: ctrl.getAll,
    validation: {
      query: {
        role: joi.string().equal(ALL),
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
    path: '/users/filter',
    controller: ctrl.searchBy,
    validation: {
      query: {
        role: joi.string().equal(ALL).required(),
        name: joi.string().min(1).max(255).allow(''),
        companyId: joi.number().integer().min(1),
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
    path: '/users/current',
    controller: ctrl.getCurrent,
    validation: {},
    middlewaresProps: {
      allowAccess: [...ALL],
    },
  },
  {
    method: GET,
    path: '/users/:id',
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
    path: '/users',
    controller: ctrl.createNew,
    validation: {
      body: joi.object({
        role: joi.string().valid(ALL).required(),
        email: joi.string().email({ minDomainAtoms: 2 }).required(),
        password: joi.string().min(6).max(255).required(),
        name: joi.string().min(1).max(255).required(),
        phone: joi.string().min(1).max(255).required(),
        description: joi.string().min(1).max(5000).allow('')
          .optional(),
      }).when(joi.object({ role: joi.equal(CLIENT) }).unknown(), {
        then: joi.object({
          status: joi.string().min(1).max(20).required(),
          companyId: joi.number().integer().min(1).required(),
          managerId: joi.number().integer().min(1).required(),
        }),
      }),
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
  {
    method: PUT,
    path: '/users/:id',
    controller: ctrl.updateOneById,
    validation: {
      params: {
        id: joi.number().integer().min(1).required(),
      },
      body: joi.object({
        id: joi.number().integer().min(1).required(),
        companyId: joi.number().integer().min(1).allow(null)
          .required(),
        status: joi.string().min(1).max(20).allow(null)
          .required(),

        role: joi.string().valid(ALL).required(),
        email: joi.string().email({ minDomainAtoms: 2 }).required(),
        password: joi.string().min(1).max(255).required(),
        name: joi.string().min(1).max(255).required(),
        phone: joi.string().min(1).max(255).required(),
        description: joi.string().min(1).max(5000).allow('')
          .optional(),

        // TODO: figure out how to add these fields automatically despite conditional validation
        createdAt: joi.date().iso().required(),
        updatedAt: joi.date().iso().required(),
      }).when(joi.object({ role: joi.equal(CLIENT) }).unknown(), {
        then: joi.object({
          managerId: joi.number().integer().min(1).required(),
        }),
      }),
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
  {
    method: DELETE,
    path: '/users/:id',
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
