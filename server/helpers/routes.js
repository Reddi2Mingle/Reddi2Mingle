const path = require('path');
const passport = require('passport');
const crypto = require('crypto');

module.exports = (socket, io, app) => {

	// GET /auth/reddit
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  The first step in Reddit authentication will involve
	//   redirecting the user to reddit.com.  After authorization, Reddit
	//   will redirect the user back to this application at /auth/reddit/callback
	//
	//   Note that the 'state' option is a Reddit-specific requirement.
  app.get('/auth/reddit', (req, res, next) => {
    req.session.state = crypto.randomBytes(32).toString('hex');
    passport.authenticate('reddit', {
      state: req.session.state,
      duration: 'permanent',
      scope: 'identity mysubreddits',
    })(req, res, next);
  });

	// GET /auth/reddit/callback
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  If authentication fails, the user will be redirected back to the
	//   login page.  Otherwise, the primary route function function will be called and
  //   will redirect the user to the home page.
  app.get('/auth/reddit/callback', passport.authenticate('reddit', { failureRedirect: '/signup'}), (req, res) => {
      res.redirect('/?userLoggedIn=true&username=' + req.user.name + '&redditId=' + req.user.id)
    });


	// send all requests to index.html so browserHistory in React Router works
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });
};
