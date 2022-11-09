process.env.NODE_ENV = 'test';
const chai = require('chai');
const { expect, should } = require('chai');
const { describe, it, after } = require('mocha');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../index');

chai.use(chaiHttp);
chai.use(should);

after((done) => {
  mongoose.connection.close();
  server.close();
  done();
});

describe('GET /rgapi/user/', () => {
  it('should fetch my recipes', (done) => {
    chai.request(server)
      .get('/rgapi/user/myrecipe')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.forEach((recipe) => {
          expect(recipe.index).to.be.a('number');
          expect(recipe.name).to.be.a('string');
          expect(recipe.date).to.be.a('string');
          expect(recipe.image).to.be.a('string');
        });
        done();
      });
  });
});
