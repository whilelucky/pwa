/* eslint-disable global-require, max-len */
import webpack from 'webpack';
import merge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import path from 'path';

const __NODE_ENV__ = process.env.NODE_ENV;
const __PWA_ENV__ = process.env.PWA_ENV;

const commonConfig = {
  entry: {
    main: ['./client/index.js'],
    vendor: ['./client/vendor.js'],
  },

  output: {
    path: path.resolve('./build/client'),
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity,
    }),
    new AssetsPlugin({
      filename: 'assetsMap.json',
      path: path.resolve('./build/client'),
      prettyPrint: true,
    }),
  ],

  postcss: () => [
    require('postcss-import')(),
    require('postcss-url')(),
    require('postcss-extend')(),
    require('postcss-cssnext')(),
    require('postcss-reporter')(),
  ],

  devtool: 'cheap-module-source-map',
};

const productionConfig = {
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css!postcss') },
      { test: /\.(gif|png|jpe?g|svg|ico)$/i, loaders: ['file?name=assets/images/[name].[hash:8].[ext]'] },
      { test: /\.(woff(2)?|ttf|otf|eot)(\?[a-z0-9=&.]+)?$/, loaders: ['url?limit=1000&name=assets/fonts/[name].[hash:8].[ext]'] },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __BROWSER__: true,
      __PWA_ENV__: JSON.stringify(__PWA_ENV__),
      __LOCAL__: __PWA_ENV__ === 'local',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
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
    new ExtractTextPlugin('assets/css/[name].[contenthash:8].css', { allChunks: true }),
    new SWPrecacheWebpackPlugin({ cacheId: 'pwa', filename: 'js/serviceWorker.js' }),
  ],
};

const developmentConfig = {
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel?cacheDirectory=babel_cache'] },
      { test: /\.css$/, loaders: ['style', 'css', 'postcss'] },
      { test: /\.(gif|png|jpe?g|svg|ico)$/i, loaders: ['file?name=assets/images/[name].[ext]'] },
      { test: /\.(woff(2)?|ttf|otf|eot)(\?[a-z0-9=&.]+)?$/, loaders: ['url?limit=1000&name=assets/fonts/[name].[ext]'] },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      __BROWSER__: true,
      __PWA_ENV__: JSON.stringify(__PWA_ENV__),
      __LOCAL__: __PWA_ENV__ === 'local',
    }),
    new DashboardPlugin(),
  ],

  devtool: 'inline-source-map',
};

const webpackClientConfig = __NODE_ENV__ === 'production'
  ? merge.smart(commonConfig, productionConfig)
  : merge.smart(commonConfig, developmentConfig);

if (__PWA_ENV__ === 'local') {
  webpackClientConfig.output.publicPath = 'http://localhost:8080/build/client/';
} else if (__PWA_ENV__ === 'development') {
  webpackClientConfig.output.publicPath = '/build/client/';
} else if (__PWA_ENV__ === 'staging') {
  webpackClientConfig.output.publicPath = '//staging.cdn.com/build/client/';
} else if (__PWA_ENV__ === 'production') {
  webpackClientConfig.output.publicPath = '//production.cdn.com/build/client/';
}

export default webpackClientConfig;
