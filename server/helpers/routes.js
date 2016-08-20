const path = require('path');
const authRouter = require('../auth/authRouter');
const userRouter = require('../user/userRouter');
const potentialRouter = require('../potentialMatch/potentialRouter');
const swipeRouter = require('../swipe/swipeRouter');

module.exports = (app) => {
  app.use('/auth', authRouter);
  app.use('/api/potentials', potentialRouter);
  app.use('/api/swipe', swipeRouter);
  app.use('/api/userInfo', userRouter);

	// send all requests to index.html so browserHistory in React Router works
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });
};
