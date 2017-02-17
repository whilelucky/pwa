/* eslint-disable max-len */
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import path from 'path';

const __NODE_ENV__ = process.env.NODE_ENV;
const __PWA_ENV__ = process.env.PWA_ENV;

const ifProd = (value, alternate) =>
  (__NODE_ENV__ === 'production' ? value : alternate);

const webpackClientConfig = {
  cache: ifProd(false, true),

  entry: {
    main: ['./client/index.js'],
    vendor: ['./client/vendor.js'],
  },

  output: {
    path: path.resolve('./build/client'),
    filename: ifProd('js/[name].[chunkhash:8].js', 'js/[name].js'),
    chunkFilename: ifProd('js/[name].[chunkhash:8].js', 'js/[name].js'),
  },

  module: {
    rules: ifProd([
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?importLoaders=1!postcss-loader' }) },
      { test: /\.(gif|png|jpe?g|svg|ico)$/i, use: [{ loader: 'file-loader', options: { name: 'assets/images/[name].[hash:8].[ext]' } }] },
      { test: /\.(woff(2)?|ttf|otf|eot)(\?[a-z0-9=&.]+)?$/, use: [{ loader: 'url-loader', options: { limit: 1000, name: 'assets/fonts/[name].[hash:8].[ext]' } }] },
    ], [
      { test: /\.js$/, exclude: /node_modules/, use: [{ loader: 'babel-loader', options: { cacheDirectory: 'babel_cache' } }] },
      { test: /\.css$/, use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader'] },
      { test: /\.(gif|png|jpe?g|svg|ico)$/i, use: [{ loader: 'file-loader', options: { name: 'assets/images/[name].[ext]' } }] },
      { test: /\.(woff(2)?|ttf|otf|eot)(\?[a-z0-9=&.]+)?$/, use: [{ loader: 'url-loader', options: { limit: 1000, name: 'assets/fonts/[name].[ext]' } }] },
    ]),
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': ifProd('"production"', '"development"'),
      __BROWSER__: true,
      __PWA_ENV__: JSON.stringify(__PWA_ENV__),
      __LOCAL__: __PWA_ENV__ === 'local',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity,
    }),
    new AssetsPlugin({
      filename: 'assetsMap.json',
      path: path.resolve('./build/client'),
      prettyPrint: true,
    }),
    ...ifProd([
      new webpack.LoaderOptionsPlugin({
        minimize: true,
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
      new ExtractTextPlugin({
        filename: 'assets/css/[name].[contenthash:8].css',
        allChunks: true,
      }),
      new SWPrecacheWebpackPlugin({
        cacheId: 'pwa',
        filename: 'js/serviceWorker.js',
        minify: true,
      }),
    ], [
      new webpack.NamedModulesPlugin(),
      new DashboardPlugin(),
    ]),
  ],

  devtool: ifProd('hidden-source-map', 'inline-source-map'),
};

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
