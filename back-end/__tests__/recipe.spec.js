process.env.NODE_ENV = 'test';
const chai = require('chai');
const { expect, should } = require('chai');
const { describe, it, after } = require('mocha');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.use(should);
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
        const allRecipes = res.body;
        allRecipes.forEach((item) => {
          expect(item.userId).not.to.be.a('null');
          expect(item.name).to.be.a('string');
          expect(item.ingredients).not.to.be.a('null');
          expect(item.steps).not.to.be.a('null');
          expect(item.cover).not.to.be.a('null');
        });
        done();
      });
  });

  // Test to get single recipe record
  it('should get a single recipe record', (done) => {
    const id = 0;
    chai.request(server)
      .get(`/rgapi/recipe/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        const {
          userId, name, ingredients, steps, cover,
        } = res.body;
        // res.body.should.be.a('object');
        expect(userId).not.to.be.a('null');
        expect(name).to.be.a('string');
        expect(ingredients).not.to.be.a('null');
        expect(steps).not.to.be.a('null');
        expect(cover).not.to.be.a('null');
        done();
      });
  });

  // Test to get recommended recipe record
  it('should get a recommended recipe record', (done) => {
    chai.request(server)
      .get('/rgapi/recipe/recbyingredients')
      .end((err, res) => {
        res.should.have.status(200);
        const {
          userId, name, ingredients, steps, cover,
        } = res.body;
        expect(userId).not.to.be.a('null');
        expect(name).not.to.be.a('null');
        expect(ingredients).not.to.be.a('null');
        expect(steps).not.to.be.a('null');
        expect(cover).not.to.be.a('null');
        done();
      });
  });

  // Test to get recommended recipe record by searching the nae
  it('should get a recommended recipe record by name', (done) => {
    const recipeName = 'Roasted Asparagus';
    chai.request(server)
      .get(`/rgapi/recipe/recbyname/${recipeName}`)
      .end((err, res) => {
        res.should.have.status(200);
        const {
          userId, name, ingredients, steps, cover,
        } = res.body;
        expect(userId).not.to.be.a('null');
        expect(name).not.to.be.a('null');
        expect(ingredients).not.to.be.a('null');
        expect(steps).not.to.be.a('null');
        expect(cover).not.to.be.a('null');
        done();
      });
  });

  // Test to get user recipe record
  it('should get a user recipe record', (done) => {
    chai.request(server)
      .get('/rgapi/recipe/my-recipes')
      .end((err, res) => {
        res.should.have.status(200);
        const {
          userId, name, ingredients, steps, cover,
        } = res.body;
        expect(userId).not.to.be.a('null');
        expect(name).not.to.be.a('null');
        expect(ingredients).not.to.be.a('null');
        expect(steps).not.to.be.a('null');
        expect(cover).not.to.be.a('null');
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
        userId: '1',
        name: 'scrambled egg',
        ingredients: 'egg',
        steps: 'just make it',
        cover: 'abc.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
});
