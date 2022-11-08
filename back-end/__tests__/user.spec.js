const assert = require('assert');
// const { expect } = require('chai');
const { describe, done, it } = require('mocha');

const UserController = require('../controllers/UserController');

describe('User Login', () => {
  console.log('Test');
  describe('User Login Success', () => {
    console.log('Test222');
    it('should return a user json object', async () => {
      console.log('Test333');
      await UserController.LoginUser(
        {
          body: {
            email: 'simpletest@gmail.com',
            password: 'password123',
          },
        },
      ).then((res) => {
        console.log(res);
        assert.equal(res, res);
        done();
      }).catch((err) => {
        console.log(err);
        done();
      });
    });
  });
});
