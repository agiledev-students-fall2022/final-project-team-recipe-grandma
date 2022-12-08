process.env.NODE_ENV = 'test';
const chai = require('chai');
const { expect } = require('chai');
const {
  describe, it, after, before,
} = require('mocha');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../index');
const { ObjectId } = require('mongodb');

chai.use(chaiHttp);

after((done) => {
  mongoose.connection.close();
  server.close();
  done();
});

// make sure to replace the testUserCredentials with what you have in your database
const testUserCredentials = {
  email: 'howdy@nyu.edu',
  password: 'howdy',
  name: 'howdy',
};

after ((done) => {
  mongoose.connection.close();
  server.close();
  done();
});


let token;
describe('Log in', () => {
  it('should register a user', (done) => {
    chai.request(server)
      .post('/rgapi/user/register')
      .type('form')
      .send({
        name: testUserCredentials.name,
        email: testUserCredentials.email,
        password: testUserCredentials.password,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
    done();
  })
  it('should log in', (done) => {
    chai.request(server)
      .post('/rgapi/user/login')
      .type('form')
      .send({
        email: testUserCredentials.email,
        password: testUserCredentials.password,
        name: testUserCredentials.name,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        token = res;
        console.log(res);
      });
      done();
  });
  it('Should create a new review an upload it to database', () => {
    chai.request(server)
      .post('/rgapi/review/review/create')
      .set('Authorization', `Bearer ${token}`)
      .type('form')
      .send({
        body: 'Test',
        stars: 1,
        username: 'Test',
        parentId: new mongoose.Schema.Types.ObjectId('test'),
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
      });
  });
});
