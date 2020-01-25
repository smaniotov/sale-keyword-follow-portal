const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { getRules, app, getApiURL } = require('./utils');

const env = process.env.ENV || 'dev';
const apiURL = getApiURL(env);

const BUILD_ENV = process.env.NODE_ENV || 'dev';
const isDev = BUILD_ENV === 'dev';

module.exports = {
  entry: './src/index.ts',
  output: {
    path: app.dist,
    filename: isDev ? 'static/js/[name].js' : 'static/js/[name].[chunkhash].js',
    chunkFilename: isDev
      ? 'statis/js/[name].chunk.js'
      : 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: '/',
  },
  stats: {
    builtAt: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    // modules: ['src', 'node_modules'],
  },
  module: {
    rules: getRules(isDev),
  },
  plugins: [
    new HtmlPlugin({
      template: path.resolve(app.src, 'index.html'),
      inject: true,
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(BUILD_ENV),
      'process.env.ENV': JSON.stringify(env),
      'process.env.apiURL': JSON.stringify(apiURL),
    }),
  ],
  devServer: {
    port: 8000,
    stats: 'minimal',
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
};
