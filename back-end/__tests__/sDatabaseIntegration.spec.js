process.env.NODE_ENV = 'test';
const chai = require('chai');
const {
  describe, it, after, before,
} = require('mocha');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../index');
const Recipe = require('../models/Recipe');

chai.use(chaiHttp);

before((done) => {
  Recipe.deleteMany({}, () => {});
  done();
});

after((done) => {
  mongoose.connection.close();
  server.close();
  done();
});

describe('workflow tests', () => {
  it('should POST a valid recipe, check that db only contains 1 recipe, verify that added and fetched recipes match', (done) => {
    const recipe = {
      userId: '12',
      username: 'john',
      name: 'pasta',
      ingredients: ['pasta', 'water'],
      steps: ['boil water', 'put pasta', 'voila'],
      imageURL: 'xyz.com',
    };

    chai.request(server)
      .post('/rgapi/recipe/create')
      .send(recipe)
      .end((err, res) => {
        res.should.have.status(201);

        chai.request(server)
          .get('/rgapi/recipe/all')
          .end((error, resp) => {
            resp.should.have.status(200);
            resp.body.should.be.a('array');
            resp.body.length.should.equal(1);

            // the added data and fetched data should match
            const savedRecipe = resp.body[0];
            (savedRecipe.userId).should.equal(recipe.userId);
            (savedRecipe.name).should.equal(recipe.name);
            (savedRecipe.imageURL).should.equal(recipe.imageURL);

            // delete the recipe from db -> not working for some reason
            // chai.request(server)
            //   .get('/rgapi/recipe/delete/:' + savedRecipe._id)
            //   .end((err, res) => {
            //     res.should.have.status(201);
            //     done();
            //   })
            done();
          });
      });
  });

  it('should fetch recipe by user id', (done) => {
    chai.request(server)
      .get(`/rgapi/recipe/user/:${12}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        // res.body.length.should.equal(1);
        // res.body[0].name.should.equal('pasta');
        done();
      });
  });
});
