const path = require('path');
const morgan = require('morgan');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const compression = require('compression');

// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpack = require('webpack');
// const config = require('../../webpack.config.js');

// const compiler = webpack({
//   output: { path: '/' }
// });

module.exports = (app) => {
  app.use(morgan('dev'));
  app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }))
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(path.join(__dirname, '/../../client')));
  app.use(compression());
  // app.use(webpackDevMiddleware(compiler, {
  //   publicPath: config.output.path,
  // }));
};

