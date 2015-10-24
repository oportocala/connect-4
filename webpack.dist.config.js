/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {

  output: {
    publicPath: '/assets/',
    path: 'dist/assets/',
    filename: 'main.js'
  },

  debug: false,
  devtool: false,
  entry: './src/scripts/components/main.js',

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'styles': path.join(__dirname, 'src/styles'),
      'components': path.join(__dirname, 'src/scripts/components/'),
      'actions': path.join(__dirname, 'src/scripts/actions/'),
      'stores': path.join(__dirname, 'src/scripts/stores/')
    }
  },

  module: {
    preLoaders: [{
      test: /\.js(x)?$/,
      exclude: /node_modules/,
      loader: 'jsxhint?babel'
    }],

    loaders: [{
      test: /\.js(x)?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.sass/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    },
    { test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
    { test: /\.ttf$/,    loader: "file-loader" },
    { test: /\.eot$/,    loader: "file-loader" },
    { test: /\.svg$/,    loader: "file-loader" }
    ]
  }
};
