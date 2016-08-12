const path = require('path');
const passport = require('passport');
const crypto = require('crypto');

module.exports = {
  crypto: (req, res, next) => {
    console.log('oh hayyyyyyyy Im in the /auth/reddit route');
    req.session.state = crypto.randomBytes(32).toString('hex');
    console.log('first session state is...:', req.session);
    passport.authenticate('reddit', {
      state: req.session.state,
      duration: 'permanent',
      scope: 'identity mysubreddits',
    })(req, res, next);
  }
}