const config = require('config');
const joi = require('joi');
const {
  GET,
  POST,
  PUT,
  DELETE,
} = require('node-susanin/methods');
const ctrl = require('./product.controller');
const { ImageService } = require('../../services');
const { MANAGER, ADMIN } = require('../../shared/user-roles');

const {
  offset: defaultOffset,
  limit: defaultLimit,
} = config.get('pagination');

const BOX_TYPES = [
  'box',
  'package',
];

module.exports = [
  {
    method: GET,
    path: '/products',
    controller: ctrl.getAll,
    validation: {
      query: {
        categoryId: joi.number().integer().min(1),
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
    path: '/products/filter',
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
    path: '/products/:id',
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
    path: '/products',
    controller: ctrl.createNew,
    validation: {
      body: {
        categoryId: joi.number().integer().min(1).required(),
        name: joi.string().min(1).max(255).required(),
        description: joi.string().min(1).max(5000).required(),
        producer: joi.string().min(1).max(255).required(),
        producerCountry: joi.string().min(1).max(255).required(),
        code: joi.string().min(1).max(255).required(),
        portionNumber: joi.number().min(1).required(),
        portionWeight: joi.number().min(1).required(),
        portionPrice: joi.number().min(1).required(),
        boxType: joi.string().valid(BOX_TYPES).required(),
        boxWeight: joi.number().min(1).required(),
        boxPrice: joi.number().min(1).required(),
      },
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
  {
    method: PUT,
    path: '/products/:id',
    controller: ctrl.updateOneById,
    validation: {
      params: {
        id: joi.number().integer().min(1).required(),
      },
      body: {
        categoryId: joi.number().integer().min(1).required(),
        name: joi.string().min(1).max(255).required(),
        description: joi.string().min(1).max(5000).required(),
        producer: joi.string().min(1).max(255).required(),
        producerCountry: joi.string().min(1).max(255).required(),
        code: joi.string().min(1).max(255).required(),
        portionNumber: joi.number().min(1).required(),
        portionWeight: joi.number().min(1).required(),
        portionPrice: joi.number().min(1).required(),
        boxType: joi.string().valid(BOX_TYPES).required(),
        boxWeight: joi.number().min(1).required(),
        boxPrice: joi.number().min(1).required(),

        // omit this props
        id: joi.number().integer().min(1),
        createdAt: joi.date().iso(),
        updatedAt: joi.date().iso(),
        images: joi.array(),
      },
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
  {
    method: DELETE,
    path: '/products/:id',
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
    method: POST,
    path: '/products/:id/images',
    controller: ctrl.uploadImage,
    validation: {
      params: {
        id: joi.number().integer().min(1).required(),
      },
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
    middlewares: [ImageService.awsUploader.single('image')],
  },
];
