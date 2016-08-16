const passport = require('passport');
const authRouter = require('express').Router();
// const authModel = require('./authModel');
const authController = require('./authController');

// Define API routes to host/api/auth

authRouter.get('/reddit', authController.crypto);
authRouter.get('/reddit/callback', passport.authenticate('reddit', { failureRedirect: '/signup' }),
  authController.login);

module.exports = authRouter;