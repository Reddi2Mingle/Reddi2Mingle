module.exports = {
  entry: './client/app.js',
  output: {
    path: __dirname,
    filename: 'client/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'] 
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
};