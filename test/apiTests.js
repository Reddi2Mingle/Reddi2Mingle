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
            expect(retrieved.password).to.be.undefined;
            expect(retrieved.accessToken).to.be.undefined;
            expect(retrieved.refreshToken).to.be.undefined;
            done();
          });
      });
    });

    describe('/api/userInfo/updatePassword', () => {
      it('sends back a 200 (OK)', done => {
        request(app)
          .post('/api/userInfo/updatePassword')
          .send({
            redditId: 'j8636',
            password: 'blablabla',
          })
          .expect(200, done);
      });
    });

    describe('/api/userInfo/addPreference', () => {
      it('sends back a 200 (OK)', done => {
        request(app)
          .post('/api/userInfo/addPreference')
          .send({
            redditId: 'j8636',
            gender: 'male',
            preference: 'women',
          })
          .expect(200, done);
      });
    });

    describe('/api/userInfo/addPhoto', () => {
      it('sends back a 200 (OK)', done => {
        request(app)
          .post('/api/userInfo/addPhoto')
          .send({
            redditId: 'j8636',
            photo: 'https://res.cloudinary.com/dkzcwlehr/image/upload/v1472163373/IMG_3513_gmtken.jpg',
          })
          .expect(200, done);
      });
    });

    // describe('/api/userInfo/loginCredentials', () => {
    //   it('sends back redditId', done => {
    //     request(app)
    //       .post('/api/userInfo/loginCredentials')
    //       .send({
    //         username: 'toiletthedestroyer',
    //         password: 'blablabla',
    //       })
    //       .end((err, res) => {
    //         if (err) {
    //           return done(err);
    //         }
    //         var retrieved = JSON.parse(res.body.body);
    //         expect(retrieved.redditId).to.equal('j8636');
    //         done();
    //       });
    //   });
    // });

    // add in additonal checks on the potential properties
    describe('/api/potentials', () => {
      it('returns an array', done => {
        request(app)
          .get('/api/potentials')
          .query({ redditId: 'j8636' })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            var retrieved = res.body;
            expect(retrieved).to.be.a('array');
            done();
          });
      });
    });

    // // this will polute my database right now
    // describe('/api/swipe', () => {
    //   it('returns an array', done => {
    //     request(app)
    //       .post('/api/swipe')
    //       .send({
    //         redditId: 'j8636',
    //         potentialId: '104s92',
    //         swipe: 'yes',
    //       })
    //       .expect(200, done);
    //   });
    // });

    describe('/api/potentials/matches', () => {
      it('returns an array with properties: name, photo, redditId, common_subreddits', done => {
        request(app)
          .get('/api/swipe/matches')
          .query({ redditId: 'j8636' })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            var retrieved = res.body;
            expect(retrieved).to.be.a('array');
            expect(retrieved[0]).to.have.property('name');
            expect(retrieved[0]).to.have.property('photo');
            expect(retrieved[0]).to.have.property('redditId');
            expect(retrieved[0]).to.have.property('common_subreddits');
            expect(retrieved[0].common_subreddits).to.be.a('array');
            done();
          });
      });
    });
  });
});
