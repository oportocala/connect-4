/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');
var path = require('path');

module.exports = {

  output: {
    filename: 'main.js',
    publicPath: '/assets/'
  },

  cache: true,
  debug: true,
  // Sourcemaps are enabled. If this is too slow, set it to false.
  devtool: "eval-source-map",
  entry: [
      'webpack/hot/only-dev-server',
      './src/scripts/components/main.js'
  ],

  stats: {
    colors: true,
    reasons: true
  },

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
      loader: 'react-hot!babel'
    }, {
      test: /\.sass/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    },
    { test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
    { test: /\.ttf$/,    loader: "file-loader" },
    { test: /\.eot$/,    loader: "file-loader" },
    { test: /\.svg$/,    loader: "file-loader" }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

};
