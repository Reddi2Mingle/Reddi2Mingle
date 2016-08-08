const path = require('path');
const passport = require('passport');
const crypto = require('crypto');

const db = require('../db/config.js');


module.exports = (socket, io, app) => {
	
	// Test from front end
	socket.on('test message', (message) => {
		console.log('!!!!!!', message);
	});

	socket.on('request login', () => {
		redditController.getSignupPage();
	})

	// GET /auth/reddit
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  The first step in Reddit authentication will involve
	//   redirecting the user to reddit.com.  After authorization, Reddit
	//   will redirect the user back to this application at /auth/reddit/callback
	//
	//   Note that the 'state' option is a Reddit-specific requirement.
	app.get('/auth/reddit', function(req, res, next){
	  req.session.state = crypto.randomBytes(32).toString('hex');
	  passport.authenticate('reddit', {
	    state: req.session.state,
	  })(req, res, next);
	});

	// GET /auth/reddit/callback
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  If authentication fails, the user will be redirected back to the
	//   login page.  Otherwise, the primary route function function will be called,
	//   which, in this example, will redirect the user to the home page.
	app.get('/auth/reddit/callback', function(req, res, next){
	  // Check for origin via state token
	  if (req.query.state == req.session.state){
	    passport.authenticate('reddit', {
	      successRedirect: '/',
	      failureRedirect: '/'
	    })(req, res, next);
	  }
	  else {
	    next( new Error(403) );
	  }
	});

	app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });
}
