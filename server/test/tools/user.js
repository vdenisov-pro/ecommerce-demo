const supertest = require('supertest');
const { path } = require('ramda');
const faker = require('faker');
const app = require('../../app/main');

const request = supertest(app);

const headers = {
  'Content-Type': 'application/json',
};

const regUser = async (customData = {}) => {
  const email = faker.internet.email();
  const passwordRegex = /^[a-zA-Z0-9]{3,30}$/;
  const password = faker.internet.password(null, null, passwordRegex);
  const userData = {
    email,
    password,
    ...customData,
  };

  await request.post('/api/firebase/auth/sign-up')
    .set(headers)
    .send(userData);

  return { email, password };
};

const getToken = path(['body', 'user', 'stsTokenManager', 'accessToken']);

const authUser = async ({ email, password }) => {
  await request.post('/api/auth/login')
    .set(headers)
    .send({ email, password })
    .expect(200);
  return request.post('/api/firebase/auth/sign-in')
    .set(headers)
    .send({ email, password })
    .expect(200)
    .then(getToken);
};

module.exports = {
  regUser,
  authUser,
};
