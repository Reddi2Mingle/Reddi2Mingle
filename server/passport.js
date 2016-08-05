const path = require('path');
const passport = require('passport');
const RedditStrategy = require('passport-reddit').Strategy;
const REDDIT_CONSUMER_KEY = require('../api_keys.js').REDDIT_CONSUMER_KEY;
const REDDIT_CONSUMER_SECRET = require('../api_keys.js').REDDIT_CONSUMER_SECRET;
const sequelize = require('./db/config.js');

// Passport session setup:

// (1) Passport needs to serialize user into the session
// In this case we are not storing the userId when serializing
// ... we could refactor to store the ID in the database
// ... in this example, the complete Reddit profile is serialized
passport.serializeUser(function(user, done) {
  console.log('serializeUser: ' + user.id);
  done(null, user.id);
});

// (2) Passport needs to deserialize user out of the session
// Retrieving from database
passport.deserializeUser(function(id, done) {
  db.UserTest.findOne({where: {redditId: id, username: name, displayName: name}})
    .then(user => {
      done(null, user);
    })
});


// Using the RedditStrategy within Passport
passport.use(new RedditStrategy({
    clientID: REDDIT_CONSUMER_KEY,
    clientSecret: REDDIT_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/reddit/callback"
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log('accessToken: ', accessToken);
    console.log('profile ', profile);
    // Add the user to the database and return the user
    Users.findOrCreate({ redditId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));