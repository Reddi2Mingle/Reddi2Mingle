const path = require('path');
const morgan = require('morgan');
const express = require('express');
const passport = require('passport');

// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpack = require('webpack');
// const config = require('../../webpack.config.js');

// const compiler = webpack({
//   output: { path: '/' }
// });

module.exports = (app) => {
  app.use(morgan('dev'));
  app.use(passport.initialize());
  app.use(express.static(path.join(__dirname, '/../../client')));
  // app.use(webpackDevMiddleware(compiler, {
  //   publicPath: config.output.path,
  // }));
};

