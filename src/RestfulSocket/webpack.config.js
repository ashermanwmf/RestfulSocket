const webpack = require('webpack');

const config = {
  entry: ['babel-polyfill', './RestfulSocket.js'],
  output: {
    path: './dist/',
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.js?/,
        include : '../RestfulSocket',
        loader : 'babel-loader'
      }
    ]
  }
};

module.exports = config;
