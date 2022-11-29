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
    const currIndex = 0;
    chai.request(server)
      .get(`/rgapi/review/database/${currIndex}`)
      .end((err, res) => {
        res.should.have.status(200);
        const {
          id, body, stars, username, parentId,
        } = res.body.reviews[0];
        expect(id).to.not.be.a('null');
        expect(body).to.be.a('string');
        expect(stars).to.be.a('number');
        expect(username).to.be.a('string');
        expect(parentId).to.be.a('string');
        done();
      });
  });
});

describe('GET /rgapi/review/database/:invalidIndex', () => {
  it('Should return status 400 since index is invalid', (done) => {
    const falseIndex = -1;
    chai.request(server)
      .get(`/rgapi/review/database/${falseIndex}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// describe('POST /rgapi/review/review/create', () => {
//   it('Should create a new review an upload it to database', (done) => {
//     chai.request(server)
//       .post('/rgapi/review/review/create')
//       .type('form')
//       .send({
//         body: 'Test',
//         stars: 1,
//         username: 'Test',
//         parentId: '0',
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         done();
//       });
//   });
// });

// describe('POST /rgapi/review/review/delete', () => { 
//   it('Should delete the previous review from database', (done) => {
//     const sampleUsername = 'Test';
//     chai.request(server)
//       .post('/rgapi/review/review/delete/Test')
//       .send({username: 'Test'})
//   })
// })
