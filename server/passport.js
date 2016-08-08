const path = require('path');
const passport = require('passport');
const RedditStrategy = require('passport-reddit').Strategy;
const db = require('./db/config.js');

var REDDIT_CONSUMER_KEY = require('../api_keys.js').REDDIT_CONSUMER_KEY;
var REDDIT_CONSUMER_SECRET = require('../api_keys.js').REDDIT_CONSUMER_SECRET;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Reddit profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  console.log('serialized user')
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('deserialized user')
  done(null, obj);
});


// Use the RedditStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Reddit
//   profile), and invoke a callback with a user object.
passport.use(new RedditStrategy({
    clientID: REDDIT_CONSUMER_KEY,
    clientSecret: REDDIT_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    console.log('it gets this far now')
    process.nextTick(function () {

      // To keep the example simple, the user's Reddit profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Reddit account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));