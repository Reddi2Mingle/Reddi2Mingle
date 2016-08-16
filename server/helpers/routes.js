const path = require('path');

const authRouter = require('../controllers/auth/authRouter');
// const authController = require('../controllers/auth/authController');
const userController = require('../controllers/userController');
const potentialRouter = require('../controllers/potentialMatch/potentialRouter');
const swipeRouter = require('../controllers/swipe/swipeRouter');

module.exports = (socket, io, app) => {
  app.use('/auth', authRouter);
  app.use('/api/potentials', potentialRouter);
  app.use('/api/swipe', swipeRouter);
  app.get('/api/userInfo', userController.queryUserInfo); //change


  app.get('/dummyData', userController.sendDummyData);

  // app.get('/auth/reddit', authController.crypto);
  // app.get('/auth/reddit/callback', passport.authenticate('reddit', { failureRedirect: '/signup' }), authController.login);
  // app.get('/subreddits', userController.createUserSubreddits);

	// send all requests to index.html so browserHistory in React Router works
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });
};
