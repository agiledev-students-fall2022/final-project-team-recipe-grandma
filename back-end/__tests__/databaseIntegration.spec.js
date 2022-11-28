process.env.NODE_ENV = 'test';
const chai = require('chai');
const {
  describe, it, after,
} = require('mocha');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../index');

chai.use(chaiHttp);

after((done) => {
  mongoose.connection.close();
  server.close();
  done();
});

const recipe = {
  userId: '2000',
  username: 'john',
  name: 'pasta',
  ingredients: ['pasta', 'water'],
  steps: ['boil water', 'put pasta', 'voila'],
  imageURL: 'xyz.com',
};

const review = {
  body: 'great recipe',
  stars: 4.5,
  username: 'john',
  parentId: '638406d7b0a567388e86b5ac',
};

let dbSizeRecipe = 0;
let savedRecipeId = 0;

describe('workflow tests', () => {
  it('should POST a valid recipe', (done) => {
    // add the recipe to the db
    chai.request(server)
      .post('/rgapi/recipe/create')
      .send(recipe)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('should fetch all recipe and verify that last recipe matches with the added recipe', (done) => {
    chai.request(server)
      .get('/rgapi/recipe/all')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');

        // the added data and fetched data should match
        dbSizeRecipe = res.body.length;
        // fetch the last added recipe
        const savedRecipe = res.body[dbSizeRecipe - 1];
        (savedRecipe.userId).should.equal(recipe.userId);
        (savedRecipe.name).should.equal(recipe.name);
        (savedRecipe.imageURL).should.equal(recipe.imageURL);
        (savedRecipe.steps.length).should.equal(recipe.steps.length);
        (savedRecipe.ingredients.length).should.equal(recipe.ingredients.length);
        const { _id } = savedRecipe;
        savedRecipeId = _id;
        done();
      });
  });

  it('should fetch recipe by user id', (done) => {
    chai.request(server)
      .get('/rgapi/recipe/user/2000')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('should delete the newly added recipe from db', (done) => {
    chai.request(server)
      .get(`/rgapi/recipe/delete/${savedRecipeId}`)
      .end(() => {
        done();
      });
  });

  it('should verify that db length is now smaller by one', (done) => {
    chai.request(server)
      .get('/rgapi/recipe/all')
      .end((err, res) => {
        res.body.length.should.equal(dbSizeRecipe - 1);
        done();
      });
  });

  it('should POST a valid review', (done) => {
    chai.request(server)
      .post('/rgapi/review/review/create')
      .send(review)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('should fetch review by id and verify that last review in the db matches with added review', (done) => {
    chai.request(server)
      .get('/rgapi/review/database/638406d7b0a567388e86b5ac')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.reviews.should.be.a('array');
        const dbSize = res.body.reviews.length;
        // fetch the last added review
        const savedReview = res.body.reviews[dbSize - 1];
        // verify that added review and fetched review matches
        (savedReview.body).should.equal(review.body);
        (savedReview.stars).should.equal(review.stars);
        (savedReview.username).should.equal(review.username);
        (savedReview.parentId).should.equal(review.parentId);
        done();
      });
  });
});
