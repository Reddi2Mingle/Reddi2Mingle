const path = require('path');
const passport = require('passport');
const crypto = require('crypto');
const auth = require('../controllers/authController');
const userController = require('../controllers/userController')
const potentialController = require('../controllers/potentialController')


module.exports = (socket, io, app) => {
  app.get('/auth/reddit', auth.crypto);
  app.get('/auth/reddit/callback', passport.authenticate('reddit', { failureRedirect: '/signup'}), auth.login);
  app.get('/userInfo', userController.queryUserInfo);
  app.get('/subreddits', userController.addUserSubreddits);
  app.get('/potentials', potentialController.queryPotentials);

	// send all requests to index.html so browserHistory in React Router works
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });
};
