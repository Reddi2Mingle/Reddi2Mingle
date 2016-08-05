const passport = require('passport');

passport.serializeUser(function(user, done) {
	console.log('serializeUser: ', user.id);
	done(null, user.id);
});