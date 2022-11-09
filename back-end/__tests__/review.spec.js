process.env.NODE_ENV = 'test';
const chai = require('chai');
const { expect } = require('chai');
const { describe, it, after } = require('mocha');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../index');

chai.use(chaiHttp);

after((done) => {
  mongoose.connection.close();
  server.close();
  done();
});

describe('GET /rgapi/review/review/:index', () => {
  it('Should return the reviews of the desired recipe by index', (done) => {
    // const correctCount = 0;
    const currIndex = 0;
    chai.request(server)
      .get(`/rgapi/review/review/${currIndex}`)
      .end((err, res) => {
        res.should.have.status(201);
        const {
          id, body, stars, username, userId, parentId, createdAt,
        } = res.body.reviews[0];
        expect(id).to.be.a('number');
        expect(body).to.be.a('string');
        expect(stars).to.be.a('number');
        expect(username).to.be.a('string');
        expect(userId).to.be.a('number');
        expect(parentId).to.be.a('number');
        expect(createdAt).to.be.a('string');
        done();
      });
  });
});

describe('GET /rgapi/review/review:invalidIndex', () => {
  it('Should return status 400 since index is invalid', (done) => {
    const falseIndex = -1;
    chai.request(server)
      .get(`/rgapi/review/review/${falseIndex}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
