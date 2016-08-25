// const chai = require('chai');
// const chaiHttp = require('chai-http');

// const server = require('../server/server');

// const should = chai.should();
// chai.use(chaiHttp);


// describe('Potentials', () => {
//   describe('GET /api/potentials', done => {
//     chai.request(server)
//       .get('/api/potentials')
//       .query({ redditId: 'j8636' })
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.should.be.a('array');
//         res.body.length.should.be.eql(0);
//         done();
//       });
//   });
// });
const chai = require('chai');
const request = require('supertest');
const keys = require('../server/helpers/api_keys');
const server = require('../server/server.js');

const expect = chai.expect;
const nock = require('nock');

describe('Reddi2Mingle', () => {
  var app;
  beforeEach(done => {
    app = server.listen(keys.PORT_APP, err => {
      err ? console.log(`Error connecting the server: ${err}`) :
      console.log(`Server listening on ${keys.PORT_APP}`);
      done();
    });
  });
  afterEach(() => {
    app.close();
  });

  describe('api', () => {
    describe('/api/userInfo', () => {
      it('responds with a 200 (OK)', done => {
        request(app)
          .get('/api/userInfo/')
          .query({ redditId: 'j8636' })
          .expect(200, done);
      });
    });

  });
});
