const passport = require('passport');
const RedditStrategy = require('passport-reddit').Strategy;
require('../api_keys');
const REDDIT_CONSUMER_KEY = process.env.REDDIT_KEY;
const REDDIT_CONSUMER_SECRET = process.env.REDDIT_SECRET;
const redditController = require('./controllers/redditController.js');


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Reddit profile is
//   serialized and deserialized.
passport.serializeUser((user, done) => {
  console.log('serialized user');
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  console.log('deserialized user');
  done(null, obj);
});


// Use the RedditStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Reddit
//   profile), and invoke a callback with a user object.
passport.use(new RedditStrategy({
  clientID: 'T3zDXS9GxKukbA',
  clientSecret: 'TAKMSJzrlZPzTWxK5O3w7OglWA8',
  callbackURL: 'http://127.0.0.1:3000/auth/reddit/callback',
},
  (accessToken, refreshToken, profile, done) => {
    // Direct reddit controller to save user to database
    redditController.createNewUser(profile, accessToken, refreshToken);
    // Authentication finished
    done(null, profile);
  }
));
