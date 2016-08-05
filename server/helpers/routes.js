const path = require('path');
const passport = require('passport');
// const sequelize = require('../db/config.js');

module.exports = (socket, io, app) => {
	
	// Test from front end
	socket.on('test message', (message) => {
		console.log('!!!!!!', message);
	});

	app.get('/auth/reddit', function(req, res, next) {
		req.session.state = crypto.randomBytes(32).toString('hex');
		passport.authenticate('reddit', {
			state: req.session.state,
			duration: 'permanent'
		})(req, res, next);
	});

	app.get('/auth/reddit/callback', function(req, res, next) {
		// Check for origin via state token
		if (req.query.state === req.session.state) {
			passport.authenticate('reddit', {
				successRedirect: '/',
				failureRedirect: '/login'
			})(req, res, next);
		} else {
			next( new Error(403) );
		}
	});

}