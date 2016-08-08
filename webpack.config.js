const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const parts = require('./libs/parts');


const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'client'),
  entry: path.join(__dirname, 'client/entry'),
  build: path.join(__dirname, 'client/build'),
};

const common = {
  entry: {
    app: PATHS.entry
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app,
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
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
      port: process.env.PORT
    })
  );
}

module.exports = validate(config);