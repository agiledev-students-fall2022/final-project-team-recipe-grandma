process.env.NODE_ENV = 'test';
const chai = require('chai');
const { expect } = require('chai');
const { describe, it, should } = require('mocha');
const chaiHttp = require('chai-http');
const server = require('../index');
const mongoose = require('mongoose');

chai.use(chaiHttp);

const UserController = require('../controllers/UserController');

after((done) => {
  mongoose.connection.close();
  server.close();
  done();
});

describe('POST /rgapi/user/login', () => {

  it('Should work with a preregistered user', (done) => {
    chai.request(server)
      .post('/rgapi/user/login')
      .type('form')
      .send({
        "email": "simpletest@gmail.com",
        "password": "password123",
        "name": "testUser"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});