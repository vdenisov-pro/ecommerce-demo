const config = require('config');
const joi = require('joi');
const {
  GET,
  POST,
  PUT,
  DELETE,
} = require('node-susanin/methods');
const ctrl = require('./order.controller');
const { MANAGER, ADMIN } = require('../../shared/user-roles');

const {
  offset: defaultOffset,
  limit: defaultLimit,
} = config.get('pagination');

const PAYMENT_METHODS = [
  'cash',
  'non-cash',
  'on-credit',
];

const ORDER_STATUSES = [
  'new',
  'verified',
  'shipped',
  'delivering',
  'completed',
  'cancelled',
];

module.exports = [
  {
    method: GET,
    path: '/orders',
    controller: ctrl.getAll,
    validation: {
      query: {
        authorId: joi.number().integer().min(1),
        addressId: joi.number().integer().min(1),
        status: joi.string().valid(ORDER_STATUSES),
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
    path: '/orders/:id',
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
    path: '/orders',
    controller: ctrl.createNew,
    validation: {
      body: {
        companyId: joi.number().integer().positive().required(),
        legalPeopleId: joi.number().integer().positive().required(),
        clientId: joi.number().integer().positive().required(),
        managerId: joi.number().integer().positive().required(),
        deliveryDate: joi.date().iso().required(),
        addressId: joi.number().integer().positive().required(),
        deliveryTimeMin: joi.string().required(),
        deliveryTimeMax: joi.string().required(),
        paymentMethod: joi.string().valid(PAYMENT_METHODS).required(),
        needDocuments: joi.boolean().default(false),
        comment: joi.string().allow(''),

        status: joi.string().valid(ORDER_STATUSES).default('new'),
        price: joi.number().min(0).default(0),
        discount: joi.number().min(0).default(0),
        totalPrice: joi.number().min(0).default(0),
      },
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
  {
    method: PUT,
    path: '/orders/:id',
    controller: ctrl.updateOneById,
    validation: {
      params: {
        id: joi.number().integer().min(1).required(),
      },
      body: {
        companyId: joi.number().integer().positive().required(),
        legalPeopleId: joi.number().integer().positive().allow(null),
        clientId: joi.number().integer().positive().required(),
        managerId: joi.number().integer().positive().required(),
        deliveryDate: joi.date().iso().allow(null),
        addressId: joi.number().integer().positive().allow(null),
        deliveryTimeMin: joi.string().required(),
        deliveryTimeMax: joi.string().required(),
        paymentMethod: joi.string().valid(PAYMENT_METHODS).required(),
        needDocuments: joi.boolean().default(false),
        comment: joi.string().allow(''),

        authorId: joi.number().integer().positive().required(),
        status: joi.string().valid(ORDER_STATUSES).default('new'),
        price: joi.number().min(0).required(),
        discount: joi.number().min(0).required(),
        totalPrice: joi.number().min(0).required(),
        deliveredAt: joi.date().iso().allow(null),

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
    path: '/orders/:id',
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
    path: '/orders/:id/items',
    controller: ctrl.getOrderItems,
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
    path: '/orders/:id/items',
    controller: ctrl.createOrderItem,
    validation: {
      params: {
        id: joi.number().integer().min(1).required(),
      },
      body: {
        productId: joi.number().integer().min(1).required(),
        productNumber: joi.number().integer().min(1).required(),
        productPrice: joi.number().min(0).required(),
        itemPrice: joi.number().min(0).required(),
        productDiscount: joi.number().min(0).default(0),
      },
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
  {
    method: PUT,
    path: '/orders/:orderId/items/:id',
    controller: ctrl.updateOrderItem,
    validation: {
      params: {
        id: joi.number().integer().min(1).required(),
        orderId: joi.number().integer().min(1).required(),
      },
      body: {
        productId: joi.number().integer().min(1),
        productNumber: joi.number().integer().min(1),
        productPrice: joi.number().min(0),
        itemPrice: joi.number().min(0),
        productDiscount: joi.number().min(0),
        orderId: joi.number().integer().min(1),

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
    path: '/orders/:orderId/items/:id',
    controller: ctrl.deleteOrderItem,
    validation: {
      params: {
        id: joi.number().integer().min(1).required(),
        orderId: joi.number().integer().min(1).required(),
      },
    },
    middlewaresProps: {
      allowAccess: [MANAGER, ADMIN],
    },
  },
];
