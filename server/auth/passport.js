const request = require('request');
const passport = require('passport');
const RedditStrategy = require('passport-reddit').Strategy;
const keys = require('../helpers/api_keys');

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
  clientID: keys.REDDIT_KEY,
  clientSecret: keys.REDDIT_SECRET,
  callbackURL: `http://www.reddi2mingle.com/auth/reddit/callback`,
},
  (accessToken, refreshToken, profile, done) => {
    // Direct reddit controller to save user to database
    console.log(`inside passport.js, url: users:${keys.PORT_USER}/api/user-sql/createUser`);
    request({
      method: 'POST',
      url: `http://${keys.USERS}:${keys.PORT_USER}/api/user-sql/createUser`,
      form: {
        accessToken,
        refreshToken,
        profile,
      },
    }, (err, response) => {
      if (err) {
        console.log('ERROR IN PASSPORT', err);
      } else {
        console.log(response.body);
        // Authentication finished
        done(null, profile);
      }
    });
  }
));
