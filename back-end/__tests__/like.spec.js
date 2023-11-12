process.env.NODE_ENV = 'test';
const chai = require('chai');
const { should, expect } = require('chai');
const { describe, it, after } = require('mocha');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
// const path = require('path');
const server = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.use(should);

after((done) => {
  mongoose.connection.close();
  server.close();
  done();
});

// let token;
let userId;
// let parentId;
// let likeId;
// const basedir = path.resolve('./__tests__');

const registerUser = {
  name: 'foobar',
  email: 'foobar123@yahoo.com',
  password: 'qwerty123',
};

const user = {
  email: 'foobar123@yahoo.com',
  password: 'qwerty123',
};

const like = {
  userId: `${userId}`,
  parentID: '6390c7a32905a7c6e8d97873',
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
        // token = res.body.token;
        userId = res.body._id;
      });
  });

  // it('should create a new like and add to database', async () => {
  //   chai.request(server)
  //     .post('/rgapi/like')
  //     .set({ Authorization: `Bearer ${token}` })
  //     .field(like)
  //     .attach('file', `${basedir}/test.jpg`, 'test.jpg')
  //     // .send(recipe)
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       expect(res.body.userID).to.equal(like.userID);
  //       expect(res.body.parentID).to.equal(like.parentID);
  //       likeId = res.body._id;
  //     });
  // });

  it('should return like by recipeID', async () => {
    chai.request(server)
      .get(`/rgapi/like/getlikebyrecipe/${like.parentId}`)
      .end((err, res) => {
        res.body.should.not.be.a('null');
        res.body.userId.should.equal(like.userId);
      });
  });
});
