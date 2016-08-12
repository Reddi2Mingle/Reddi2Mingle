const path = require('path');
const passport = require('passport');
const RedditStrategy = require('passport-reddit').Strategy;
// const db = require('./db/config.js');

const REDDIT_CONSUMER_KEY = process.env.REDDIT_KEY;
const REDDIT_CONSUMER_SECRET = process.env.REDDIT_SECRET;


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
  // db.Users.findOne({where: {redditId: id}})
  //   .then(user => done(null, user));
});


// Use the RedditStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Reddit
//   profile), and invoke a callback with a user object.
passport.use(new RedditStrategy({
  clientID: 'T3zDXS9GxKukbA',
  clientSecret: 'TAKMSJzrlZPzTWxK5O3w7OglWA8',
  callbackURL: 'http://127.0.0.1:80/auth/reddit/callback',
},
  (accessToken, refreshToken, profile, done) => {
    // Authentication finished, find/add the user from/to the database
    console.log('profile name here!!!!', profile.name);
    db.Users.findOrCreate({
      where: {
        username: profile.name,
        redditId: profile.id },
    }).then((data) => {
      done(null, profile);
    });
  }
));
