const joi = require('joi');
const {
  GET,
  POST,
  DELETE,
} = require('node-susanin/methods');
const ctrl = require('./firebase.controller');
const { EVERYONE } = require('../../shared/user-roles');

module.exports = [
  {
    method: POST,
    path: '/firebase/auth/verify-token',
    controller: ctrl.verifyToken,
    validation: {
      body: {
        token: joi.string().required(),
      },
    },
    middlewaresProps: {
      allowAccess: [EVERYONE],
    },
  },
  {
    method: POST,
    path: '/firebase/auth/sign-up',
    controller: ctrl.signUp,
    validation: {
      body: {
        email: joi.string().email({ minDomainAtoms: 2 }).required(),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
      },
    },
    middlewaresProps: {
      allowAccess: [EVERYONE],
    },
  },
  {
    method: POST,
    path: '/firebase/auth/sign-in',
    controller: ctrl.signIn,
    validation: {
      body: {
        email: joi.string().email({ minDomainAtoms: 2 }).required(),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
      },
    },
    middlewaresProps: {
      allowAccess: [EVERYONE],
    },
  },
  {
    method: GET,
    path: '/firebase/users',
    controller: ctrl.getAllUsers,
    validation: {},
  },
  {
    method: DELETE,
    path: '/firebase/users/:uid',
    controller: ctrl.deleteFromFirebaseByUid,
    validation: {
      params: {
        uid: joi.string().uuid().required(),
      },
    },
    middlewaresProps: {
      allowAccess: [EVERYONE],
    },
  },
];
