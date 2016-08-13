const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const parts = require('./libs/parts');


const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'client'),
  entry: path.join(__dirname, 'client/entry'),
  build: path.join(__dirname, 'client/build'),
  public: '/assets/',
};

const common = {
  entry: {
    app: PATHS.entry,
  },
  output: {
    path: PATHS.build,
    publicPath: PATHS.public,
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel'],
        include: PATHS.app,
      },
      {
        test: /\.scss$/,
        loaders: ['sytle', 'css', 'autoprefixer', 'sass'],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};

process.env.BABEL_ENV = TARGET;

var config;
switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common, {});
    break;
  default:
    config = merge(
      common,
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
      })
    );
}

module.exports = validate(config);
