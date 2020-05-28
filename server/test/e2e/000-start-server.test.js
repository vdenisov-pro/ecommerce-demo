const supertest = require('supertest');
const chai = require('chai');
const { execSync } = require('child_process');
const app = require('../../app/main');

const undoMigrate = () => new Promise((resolve, reject) => {
  try {
    execSync('node_modules/.bin/sequelize db:migrate:undo:all', { stdio: 'inherit' });
    resolve('OK');
  } catch (e) {
    reject(e);
  }
});

const migrate = () => new Promise((resolve, reject) => {
  try {
    execSync('node_modules/.bin/sequelize db:migrate', { stdio: 'inherit' });
    resolve('OK');
  } catch (e) {
    reject(e);
  }
});

const request = supertest(app);
const { expect } = chai;

describe('Server starting', () => {
  before(async function dropDb() {
    this.timeout(120000);
    await undoMigrate();
    await migrate();
  });
  describe('App starting', () => {
    it('should get api welcome message', async () => {
      const res = await request.get('/api');
      expect(res.statusCode).to.equal(200);
      expect(res.text).to.be.a('string');
      expect(res.text).to.equal('Welcome to API !!!');
    });
  });
});
