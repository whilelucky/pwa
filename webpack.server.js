/* eslint-disable max-len */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const __PWA_ENV__ = process.env.PWA_ENV;
const __PWA_PUBLIC_PATH__ = process.env.PWA_PUBLIC_PATH;
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './server/index.js',

  target: 'node',

  externals: [
    nodeExternals({ whitelist: [/\.css$/] }),
    /assetsManifest.json/,
  ],

  output: {
    path: path.resolve('./build/server'),
    publicPath: __PWA_PUBLIC_PATH__,
    filename: 'index.js',
    chunkFilename: '[name].js',
    libraryTarget: 'commonjs2',
  },

  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },

  module: {
    rules: isProd ? [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.css$/, use: ['css-loader/locals', 'postcss-loader'] },
      { test: /\.(gif|png|jpe?g|svg|ico)$/i, use: [{ loader: 'file-loader', options: { name: 'images/[name].[hash:8].[ext]' } }] },
      { test: /\.(woff(2)?|ttf|otf|eot)(\?[a-z0-9=&.]+)?$/, use: [{ loader: 'url-loader', options: { limit: 1000, name: 'fonts/[name].[hash:8].[ext]' } }] },
    ] : [
      { test: /\.js$/, exclude: /node_modules/, use: [{ loader: 'babel-loader', options: { cacheDirectory: 'babel_cache' } }] },
      { test: /\.css$/, use: ['css-loader/locals', 'postcss-loader'] },
      { test: /\.(gif|png|jpe?g|svg|ico)$/i, use: [{ loader: 'file-loader', options: { name: 'images/[name].[ext]' } }] },
      { test: /\.(woff(2)?|ttf|otf|eot)(\?[a-z0-9=&.]+)?$/, use: [{ loader: 'url-loader', options: { limit: 1000, name: 'fonts/[name].[ext]' } }] },
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(['./build/server']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isProd ? '"production"' : '"development"',
      __BROWSER__: false,
      __PWA_ENV__: JSON.stringify(__PWA_ENV__),
      __LOCAL__: __PWA_ENV__ === 'local',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      minChunks: 2,
    }),
    ...(isProd ? [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
    ] : [
      new webpack.NamedModulesPlugin(),
    ]),
  ],

  devtool: 'source-map',
};
