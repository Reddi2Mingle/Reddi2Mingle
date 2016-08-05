module.exports = {
  entry: './client/entry.js',
  output: {
    path: './client/build',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
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
    extensions: ['', '.js', '.jsx']
  },
};