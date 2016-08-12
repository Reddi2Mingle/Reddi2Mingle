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
  },
  cb: (req, res, next) => {
  // Check for origin via state token (currently commented as session.state is undefined)
  // if (req.query.state == req.session.state){
    passport.authenticate('reddit', {
      successRedirect: '/',
      failureRedirect: '/signup',
    })(req, res, next);
    // } else {
    //   next( new Error(403) );
    // }
  }
}