const config = require('config');
const joi = require('joi');
const {
  GET,
  POST,
  PUT,
  DELETE,
} = require('node-susanin/methods');
const ctrl = require('./company.controller');
const { MANAGER, ADMIN } = require('../../shared/user-roles');

const {
  offset: defaultOffset,
  limit: defaultLimit,
} = config.get('pagination');

module.exports = [
  {
    method: GET,
    path: '/companies',
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
    path: '/companies/filter',
    controller: ctrl.searchBy,
    validation: {
      query: {
        name: joi.string().min(1).max(255).allow(''),
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
    path: '/companies/:id',
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
    path: '/companies',
    controller: ctrl.createNew,
    validation: {
      body: {
        name: joi.string().min(1).max(255).required(),
        managerId: joi.number().integer().positive().required(),
      },
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
  {
    method: POST,
    path: '/companies/:id/addresses',
    controller: ctrl.editAdresses,
    validation: {
      params: {
        id: joi.number().integer().min(1).required(),
      },
      body: {
        addresses: joi.array().items(
          joi.object().keys({
            country: joi.string().min(1).max(255).required(),
            city: joi.string().min(1).max(255).required(),
            street: joi.string().min(1).max(255).required(),
            house: joi.string().min(1).max(255).required(),
            comment: joi.string().min(1).max(5000).allow(['', null])
              .default(null),
            courierId: joi.number().integer().positive().required(),
          }),
        ).min(0).required(),
      },
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
  {
    method: POST,
    path: '/companies/:id/legal_people',
    controller: ctrl.editLegalPersons,
    validation: {
      params: {
        id: joi.number().integer().min(1).required(),
      },
      body: {
        legalPeople: joi.array().items(
          joi.object().keys({
            type: joi.string().min(1).max(255).required(),
            name: joi.string().min(1).max(255).required(),
            personDetails: joi.string().min(1).max(5000).default(null),
          }),
        ).min(0).required(),
      },
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
  {
    method: PUT,
    path: '/companies/:id',
    controller: ctrl.updateOneById,
    validation: {
      params: {
        id: joi.number().integer().min(1).required(),
      },
      body: {
        name: joi.string().min(1).max(255).required(),
        managerId: joi.number().integer().positive().required(),

        // omit this props
        id: joi.number().integer().min(1),
        createdAt: joi.date().iso(),
        updatedAt: joi.date().iso(),
        addresses: joi.array(),
        legalPeople: joi.array(),
        clients: joi.array(),
        manager: joi.object().allow(null),
      },
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
  {
    method: DELETE,
    path: '/companies/:id',
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
  {
    method: GET,
    path: '/companies/:id/legal_people',
    controller: ctrl.searchLegalPeople,
    validation: {
      params: {
        id: joi.number().integer().min(1).required(),
      },
      query: {
        name: joi.string().min(1).max(255).allow(''),
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
    path: '/companies/:id/addresses',
    controller: ctrl.searchAddresses,
    validation: {
      params: {
        id: joi.number().integer().min(1).required(),
      },
      query: {
        q: joi.string().min(1).max(255).allow(''),
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
    path: '/companies/:id/managers',
    controller: ctrl.searchManagers,
    validation: {
      params: {
        id: joi.number().integer().min(1).required(),
      },
      query: {
        name: joi.string().min(1).max(255).allow(''),
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
    path: '/companies/:id/clients',
    controller: ctrl.searchClients,
    validation: {
      params: {
        id: joi.number().integer().min(1).required(),
      },
      query: {
        name: joi.string().min(1).max(255).allow(''),
        offset: joi.number().integer().min(0).default(defaultOffset),
        limit: joi.number().integer().min(0).default(defaultLimit),
      },
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
];
