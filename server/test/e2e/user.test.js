const supertest = require('supertest');
const chai = require('chai');
const app = require('../../app/main');
const { regUser, authUser } = require('../tools/user');
const { getBody } = require('../tools/request');

const request = supertest(app);
const { expect } = chai;

const headers = {
  'Content-Type': 'application/json',
};

const expiredToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0ODZkYTNlMWJmMjA5YzZmNzU2MjlkMWQ4MzRmNzEwY2EzMDlkNTAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3dlZXRwYXktbG9jYWwiLCJhdWQiOiJzd2VldHBheS1sb2NhbCIsImF1dGhfdGltZSI6MTU2ODMxMTE5NywidXNlcl9pZCI6IlZ5SGVJazZLRmVQbFhhQXNPbEZ6YTVtUjU0aDIiLCJzdWIiOiJWeUhlSWs2S0ZlUGxYYUFzT2xGemE1bVI1NGgyIiwiaWF0IjoxNTY4MzgxMTI5LCJleHAiOjE1NjgzODQ3MjksImVtYWlsIjoicm9vdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsicm9vdEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.UAbh_BI6ek1rXuK22SyW95Cdd2M7nviEG5FZCdMfwJNn5F1NHYqn9pK0dQT776zM-fqtOyFYfz00FgGeNzC5kfUOCoW3RMQhnmkY-dquIyNH8PTYPQWl51sXwobw39uipmsFVr6wnrFx6OYzPFClfo5ND_bXJ8zQyvAVOqENphl9DRLBgw_qCpm68NT3Rv32T3gTiXuA0JWH_MGUcsHth4PEQSI_c6EDM-C83Sxe5K46_tSX6fa7pluHSmLL2RNp52VqkUFBiiKAJTBTYEmzj4fWLzO5jQlu8Jj7-LVEVsBlm7oiVpUMpPsuZ6ZxCyXaG5YwHqsMEBmJ4yQ4SgjP5Q';

describe('USERS', () => {
  before(async () => {
    headers.Authorization = await authUser(await regUser());
  });

  describe('GET /users/current', async () => {
    context('Valid query', () => {
      let databaseUser;
      let firebaseUser;

      before(async () => {
        databaseUser = await request.get('/api/users/current')
          .set(headers)
          .expect(200)
          .then(getBody);

        firebaseUser = await request.post('/api/firebase/auth/verify-token')
          .set(headers)
          .send({ token: headers.Authorization })
          .expect(200)
          .then(getBody);
      });

      it('should return object', () => {
        expect(databaseUser).to.be.an('object');
      });

      it('return object should have property "email"', () => {
        expect(databaseUser).to.have.property('email')
          .that.is.an('string');
      });

      it('should be the same user (by matching email addresses)', async () => {
        expect(databaseUser.email.toLowerCase()).to.equal(firebaseUser.email);
      });
    });

    context('Not valid query', () => {
      it('should return status 401 in case of no "Authorization" header', async () => {
        await request.get('/api/users/current')
          // .set(headers)
          .expect(401);
      });

      it('should return status 401 in case of expired token', async () => {
        await request.get('/api/users/current')
          .set({ ...headers, Authorization: expiredToken })
          .expect(401);
      });
    });
  });
});
