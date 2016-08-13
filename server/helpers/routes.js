const path = require('path');
const passport = require('passport');
const crypto = require('crypto');
const authController = require('../controllers/authController.js');
const userController = require('../controllers/userController.js');
const potentialController = require('../controllers/potentialController.js');

module.exports = (socket, io, app) => {

  app.get('/auth/reddit', authController.crypto);
  app.get('/auth/reddit/callback', passport.authenticate('reddit', { failureRedirect: '/signup'}), authController.login);
  app.get('/userInfo', userController.queryUserInfo);
  app.get('/subreddits', userController.createUserSubreddits);
  app.get('/potentials', potentialController.queryPotentials);
  app.get('/createPotentials', potentialController.createPotentials);

  app.get('/dummyData', userController.sendDummyData);

	// send all requests to index.html so browserHistory in React Router works
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });

};
