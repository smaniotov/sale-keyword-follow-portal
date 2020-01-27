const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack-base.config');
const { app } = require('./utils');

module.exports = () => (
  merge(base, {
    context: app.root,
    mode: 'development',
    devtool: 'source-map',
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
      port: 8000,
      stats: 'minimal',
      host: '0.0.0.0',
      disableHostCheck: true,
      historyApiFallback: {
        disableDotRule: true,
      },
    },
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    },
  })
);
