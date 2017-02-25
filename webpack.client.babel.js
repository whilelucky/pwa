/* eslint-disable max-len */
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import DashboardPlugin from 'webpack-dashboard/plugin';

const __NODE_ENV__ = process.env.NODE_ENV;
const __PWA_ENV__ = process.env.PWA_ENV;
const __PWA_PUBLIC_PATH__ = process.env.PWA_PUBLIC_PATH;

const ifProd = (prodConfig, devConfig) =>
  (__NODE_ENV__ === 'production' ? prodConfig : devConfig);

export default {
  cache: ifProd(false, true),

  entry: {
    main: ['./client/index.js'],
    vendor: ['./client/vendor.js'],
  },

  output: {
    path: path.resolve('./build/client'),
    publicPath: __PWA_PUBLIC_PATH__,
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
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'bundle-analysis.html',
      }),
    ], [
      new webpack.NamedModulesPlugin(),
      new DashboardPlugin(),
    ]),
  ],

  devtool: ifProd('hidden-source-map', 'inline-source-map'),
};
