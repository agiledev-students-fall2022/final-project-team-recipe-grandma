process.env.NODE_ENV = 'test';
const chai = require('chai');
const { should, expect } = require('chai');
const { describe, it, after } = require('mocha');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const path = require('path');
const server = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.use(should);

after((done) => {
  mongoose.connection.close();
  server.close();
  done();
});

let token;
let userId;
let recipeId;
const basedir = path.resolve('./__tests__');

const registerUser = {
  name: 'foobar',
  email: 'foobar123@yahoo.com',
  password: 'qwerty123',
};

const user = {
  email: 'foobar123@yahoo.com',
  password: 'qwerty123',
};

const recipe = {
  userId: `${userId}`,
  name: 'pastaegg',
  ingredients: ['pasta', 'egg'],
  steps: ['boil pasta', 'fry egg', 'combine'],
};

describe('workflow tests', () => {
  it('should register a user', async () => {
    chai.request(server)
      .post('/rgapi/user/register')
      .send(registerUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.email).to.equal(registerUser.email);
        expect(res.body.name).to.equal(registerUser.name);
      });
  });

  it('should login a user', async () => {
    chai.request(server)
      .post('/rgapi/user/login')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.email).to.equal(user.email);
        token = res.body.token;
        userId = res.body._id;
      });
  });

  it('should create a new recipe and add to database', async () => {
    chai.request(server)
      .post('/rgapi/recipe/create')
      .set({ Authorization: `Bearer ${token}` })
      .field(recipe)
      .attach('file', `${basedir}/test.jpg`, 'test.jpg')
      // .send(recipe)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal(recipe.name);
        expect(res.body.steps).to.equal(recipe.steps);
        recipeId = res.body._id;
      });
  });

  it('should return all recipes', () => {
    chai.request(server)
      .get('/rgapi/recipe/all')
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });

  it('should have status 401 as no ingredient is sent', (done) => {
    chai.request(server)
      .get('/rgapi/recipe/recbyingredients')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('should return recipe by name', async () => {
    chai.request(server)
      .get(`/rgapi/recipe/recbyname/${recipe.name}`)
      .end((err, res) => {
        res.body.should.not.be.a('null');
        res.body.name.should.equal(recipe.name);
        res.body.ingredients.should.equal(recipe.ingredients);
        res.body.steps.should.equal(recipe.steps);
      });
  });

  it('should return a single recipe', (done) => {
    chai.request(server)
      .get(`/rgapi/recipe/${recipeId}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.body.should.not.be.a('null');
        const {
          id, userID, name, ingredients, steps, cover, createdAt, updatedAt,
        } = res.body;
        expect(id).not.to.be.a('null');
        expect(userID).not.to.be.a('null');
        expect(name).not.to.be.a('null');
        expect(ingredients).not.to.be.a('null');
        expect(steps).not.to.be.a('null');
        expect(cover).not.to.be.a('null');
        expect(createdAt).not.to.be.a('null');
        expect(updatedAt).not.to.be.a('null');
        done();
      });
  });

  it('should return a recipe by userid', (done) => {
    chai.request(server)
      .get(`/rgapi/recipe/user/${userId}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.body.should.not.be.a('null');
        const {
          id, userID, name, ingredients, steps, cover, createdAt, updatedAt,
        } = res.body;
        expect(id).not.to.be.a('null');
        expect(userID).not.to.be.a('null');
        expect(name).not.to.be.a('null');
        expect(ingredients).not.to.be.a('null');
        expect(steps).not.to.be.a('null');
        expect(cover).not.to.be.a('null');
        expect(createdAt).not.to.be.a('null');
        expect(updatedAt).not.to.be.a('null');
        done();
      });
  });

  it('should return the deleted recipe', async () => {
    chai.request(server)
      .get(`/rgapi/recipe/delete/${recipeId}`)
      .end((err, res) => {
        res.body.should.not.be.a('null');
      });
  });
});
