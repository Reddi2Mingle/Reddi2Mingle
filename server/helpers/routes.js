const path = require('path');
const passport = require('passport');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const potentialController = require('../controllers/potentialController');
const swipeController = require('../controllers/swipeController');
const matchController = require('../controllers/matchController');

module.exports = (socket, io, app) => {
  app.get('/auth/reddit', authController.crypto);
  app.get('/auth/reddit/callback', passport.authenticate('reddit', { failureRedirect: '/signup' }), authController.login);
  app.get('/dummyData', userController.sendDummyData);
  app.get('/userInfo', userController.queryUserInfo);
  // app.get('/subreddits', userController.createUserSubreddits);
  app.get('/potentials', potentialController.queryPotentials);
  app.get('/createPotentials', potentialController.createPotentials);
  app.post('/swipe', swipeController.likeResponse);
  app.get('/dbmatches', matchController.showMatches);

	// send all requests to index.html so browserHistory in React Router works
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });
};
