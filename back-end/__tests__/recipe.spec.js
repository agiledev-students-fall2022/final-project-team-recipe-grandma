process.env.NODE_ENV = 'test';
const chai = require('chai');
const { expect } = require('chai');
const { describe, it, after } = require('mocha');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../index');

// Configure chai
chai.use(chaiHttp);
// chai.should();

// const RecipeController = require('../controllers/RecipeController');

after((done) => {
  mongoose.connection.close();
  server.close();
  done();
});

describe('GET /rgapi/recipe/', () => {
  it('test to get all recipes endpoint', (done) => {
    chai.request(server)
      .get('/rgapi/recipe/recipelist')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  // Test to get single recipe record
  it('should get a single recipe record', (done) => {
    const id = 1;
    chai.request(server)
      .get(`/rgapi/recipe/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  // Test to get recommended recipe record
  it('should get a recommended recipe record', (done) => {
    chai.request(server)
      .get('/rgapi/recipe/recommendation')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  // Test to get user recipe record
  it('should get a user recipe record', (done) => {
    chai.request(server)
      .get('/rgapi/recipe/my-recipes')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('POST /rgapi/recipe/create', () => {
// test create new post endpoint
  it('should post a new recipe', (done) => {
    chai.request(server)
      .post('/rgapi/recipe/create')
      .type('form')
      .send({
        index: '1',
        name: 'scrambled egg',
        ingredients: 'egg',
        steps: 'just make it',
        imageURL: 'abc.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
