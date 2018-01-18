var path = require('path');
var webpack = require('webpack');

var baseConfig = {
  entry: './DOMEventer.js',
  output: {
    libraryTarget: 'umd',
    filename: 'index.js',
    path: path.resolve(__dirname, '..', './lib')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      }
    ]
  },
};

module.exports = baseConfig;
