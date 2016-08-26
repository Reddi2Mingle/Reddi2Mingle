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
      it('sends back necessary info about user', done => {
        request(app)
          .get('/api/userInfo')
          .query({ redditId: 'j8636' })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            var retrieved = JSON.parse(res.body.body);
            expect(retrieved.name).to.equal('toiletthedestroyer');
            expect(retrieved.redditId).to.equal('j8636');
            expect(retrieved.photo).to.be.a('string');
            expect(retrieved.gender).to.be.a('string');
            expect(retrieved.preference).to.be.a('string');
            expect(retrieved.trophyCount).to.be.a('number');
            expect(retrieved.postKarma).to.be.a('number');
            expect(retrieved.commentKarma).to.be.a('number');
            expect(retrieved.receivedUpvotes).to.be.a('number');
            expect(retrieved.receivedDownvotes).to.be.a('number');
            expect(retrieved.deliveredUpvotes).to.be.a('number');
            expect(retrieved.deliveredDownvotes).to.be.a('number');
            expect(retrieved.subreddits).to.be.a('array');
            done();
          });
      });
      it('excludes password, accessToken, and refreshToken', done => {
        request(app)
          .get('/api/userInfo')
          .query({ redditId: 'j8636' })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            var retrieved = JSON.parse(res.body.body);
            expect(retrieved.password).to.equal(undefined);
            expect(retrieved.accessToken).to.equal(undefined);
            expect(retrieved.refreshToken).to.equal(undefined);
            done();
          });
      });
    });

    describe('/api/userInfo/updatePassword', () => {
      it('sends back a 200 (OK)', done => {
        request(app)
          .get('/api/userInfo/updatePassword')
          .query({ redditId: 'j8636' })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            var retrieved = JSON.parse(res.body.body);
            expect(retrieved.password).to.equal(undefined);
            expect(retrieved.accessToken).to.equal(undefined);
            expect(retrieved.refreshToken).to.equal(undefined);
            done();
          });
      });
    });
  });
});
