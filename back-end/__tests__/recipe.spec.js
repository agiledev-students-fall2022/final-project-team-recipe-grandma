process.env.NODE_ENV = 'test';
const chai = require('chai');
const { expect, should } = require('chai');
const {
  describe, it, after, before,
} = require('mocha');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.use(should);

after((done) => {
  mongoose.connection.close();
  server.close();
  done();
});

const testUserCredentials = {
  email: 'yeonieh@gmail.com',
  password: '12345',
  name: 'yeonie',
};

let testUser;
before((done) => {
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
      testUser = res.body;
      done();
    });
});

// let deleteUser;
// after((done) => {
//   chai.request(server)
//     .post('/rgapi/user/delete')
//     .type('form')
//     .send({
//       id: testUserCredentials.id,
//     })
//     .end((err, res) => {
//       expect(res).to.have.status(200);
//       testUser = res.body;
//       done();
//     });
// });

describe('GET /rgapi/recipe/', () => {
  // Test to get all recipes
  // changed logic to test first recipe instead of the whole recipes in the matter of runtime
  it('Should return all recipes', (done) => {
    chai.request(server)
      .get('/rgapi/recipe/all')
      .end((err, res) => {
        res.should.have.status(200);
        const allRecipes = res.body;
        const {
          id, userId, name, ingredients, steps, cover, createdAt, updatedAt,
        } = allRecipes[0];
        expect(id).not.to.be.a('null');
        expect(userId).not.to.be.a('null');
        expect(name).to.be.a('string');
        expect(ingredients).to.be.a('array');
        expect(steps).to.be.a('array');
        expect(cover).not.to.be.a('null');
        expect(createdAt).not.to.be.a('null');
        expect(updatedAt).not.to.be.a('null');
        done();
      });
  });

  // Test to get recommended recipe record by searching the name
  it('Should return a recommended recipe record by name', (done) => {
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

  // Test to get single recipe record & authentication
  it('Should return a single recipe', (done) => {
    chai.request(server)
      .get('/rgapi/recipe/6386c88d4a8f28288e0b2c06')
      .set({ Authorization: `Bearer ${testUser.token}` })
      .end((err, res) => {
        res.should.have.status(200);
        const {
          id, userId, name, ingredients, steps, cover, createdAt, updatedAt,
        } = res.body;
        expect(id).not.to.be.a('null');
        expect(userId).not.to.be.a('null');
        expect(name).to.be.a('string');
        expect(ingredients).to.be.a('array');
        expect(steps).to.be.a('array');
        expect(cover).not.to.be.a('null');
        expect(createdAt).not.to.be.a('null');
        expect(updatedAt).not.to.be.a('null');
        done();
      });
  });

  // Test to get recommended recipe record by ingredients
  // POST REQUEST
  it('Should create a recommended recipe by ingredients', (done) => {
    chai.request(server)
      .get('/rgapi/recipe/search-by-ingredients/')
      .set({ Authorization: `Bearer ${testUser.token}` })
      .type('form')
      // .send({
      //   name: 'test'
      // })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  // Test creating a recipe
  // HAVE TO POST A PHOTO AS WELL
  it('Should create a new recipe and upload to the database', (done) => {
    chai.request(server)
      .post('/rgapi/review/review/create')
      .set({ Authorization: `Bearer ${testUser.token}` })
      .type('form')
      .send({
        name: 'testing',
        ingredients: ['apple'],
        steps: ['wash your apple', 'trash your apple'],
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
});
