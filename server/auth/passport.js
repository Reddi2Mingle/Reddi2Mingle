const request = require('request');
const passport = require('passport');
const RedditStrategy = require('passport-reddit').Strategy;
const REDDIT_CONSUMER_KEY = process.env.REDDIT_KEY;
const REDDIT_CONSUMER_SECRET = process.env.REDDIT_SECRET;
require('../helpers/api_keys');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Reddit profile is
//   serialized and deserialized.
passport.serializeUser((user, done) => {
  console.log('server/passport.js 18: serialized user', user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});


// Use the RedditStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Reddit
//   profile), and invoke a callback with a user object.
passport.use(new RedditStrategy({
  clientID: REDDIT_CONSUMER_KEY,
  clientSecret: REDDIT_CONSUMER_SECRET,
  callbackURL: `http://127.0.0.1:${process.env.PORT_APP}/auth/reddit/callback`,
  // callbackURL: `http://10.8.26.223:${process.env.PORT_APP}/auth/reddit/callback`,
},
  (accessToken, refreshToken, profile, done) => {
    // Direct reddit controller to save user to database
    console.log(`inside passport.js, url: users:${process.env.PORT_USER}/api/user-sql/createUser`)
    request({
      method: 'POST',
      // url: `http://10.8.26.223:${process.env.PORT_USER}/api/user-sql/createUser`,
      url: `http://users:${process.env.PORT_USER}/api/user-sql/createUser`,
      form: {
        accessToken,
        refreshToken,
        profile,
      },
    }, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log(response.body);
        // Authentication finished
        done(null, profile);
      }
    });
  }
));
