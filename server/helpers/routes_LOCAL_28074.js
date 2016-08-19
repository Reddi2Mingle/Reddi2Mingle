const path = require('path');
const authRouter = require('../components/auth/authRouter');
const userRouter = require('../components/user/userRouter');
const potentialRouter = require('../components/potentialMatch/potentialRouter');
const swipeRouter = require('../components/swipe/swipeRouter');

module.exports = (socket, io, app) => {
  app.use('/auth', authRouter);
  app.use('/api/potentials', potentialRouter);
  app.use('/api/swipe', swipeRouter);
  app.use('/api/userInfo', userRouter);

	// send all requests to index.html so browserHistory in React Router works
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });
};
