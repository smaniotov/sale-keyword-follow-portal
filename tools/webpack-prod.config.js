const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const base = require('./webpack-base.config');

module.exports = () => (
  merge(base, {
    mode: 'production',
    plugins: [
      new webpack.ProgressPlugin({
        entries: true,
        modules: true,
        modulesCount: 100,
        profile: true,
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
      new webpack.HashedModuleIdsPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
      }),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: { safari10: false, ie8: false, mangle: true },
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 20,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'async',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
    },
  })
);
