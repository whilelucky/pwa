/* eslint-disable global-require, max-len */
import webpack from 'webpack';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

const __NODE_ENV__ = process.env.NODE_ENV;
const __PWA_ENV__ = process.env.PWA_ENV;

const commonConfig = {
  entry: './server/index.js',

  target: 'node',

  externals: [
    nodeExternals({ whitelist: [/\.css$/] }),
    /assetsMap.json/,
  ],

  output: {
    filename: 'index.js',
    chunkFilename: '[name].js',
    path: './build/server',
    libraryTarget: 'commonjs',
  },

  module: {
    loaders: [
      { test: /\.css$/, use: ['isomorphic-style-loader', 'css-loader'] },
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],

  devtool: 'source-map',
};

const productionConfig = {
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.(gif|png|jpe?g|svg|ico)$/i, use: [{ loader: 'file-loader', options: { name: 'assets/images/[name].[hash:8].[ext]' } }] },
      { test: /\.(woff(2)?|ttf|otf|eot)(\?[a-z0-9=&.]+)?$/, use: [{ loader: 'url-loader', options: { limit: 1000, name: 'assets/fonts/[name].[hash:8].[ext]' } }] },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __BROWSER__: false,
      __PWA_ENV__: JSON.stringify(__PWA_ENV__),
      __LOCAL__: __PWA_ENV__ === 'local',
    }),
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
  ],
};

const developmentConfig = {
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, use: [{ loader: 'babel-loader', options: { cacheDirectory: 'babel_cache' } }] },
      { test: /\.(gif|png|jpe?g|svg|ico)$/i, use: [{ loader: 'file-loader', options: { name: 'assets/images/[name].[ext]' } }] },
      { test: /\.(woff(2)?|ttf|otf|eot)(\?[a-z0-9=&.]+)?$/, use: [{ loader: 'url-loader', options: { limit: 1000, name: 'assets/fonts/[name].[ext]' } }] },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      __BROWSER__: false,
      __PWA_ENV__: JSON.stringify(__PWA_ENV__),
      __LOCAL__: __PWA_ENV__ === 'local',
    }),
    new webpack.NamedModulesPlugin(),
  ],
};

const webpackServerConfig = __NODE_ENV__ === 'production'
  ? merge.smart(commonConfig, productionConfig)
  : merge.smart(commonConfig, developmentConfig);

if (__PWA_ENV__ === 'local') {
  webpackServerConfig.output.publicPath = 'http://localhost:8080/build/client/';
} else if (__PWA_ENV__ === 'development') {
  webpackServerConfig.output.publicPath = '/build/client/';
} else if (__PWA_ENV__ === 'staging') {
  webpackServerConfig.output.publicPath = '//staging.cdn.com/build/client/';
} else if (__PWA_ENV__ === 'production') {
  webpackServerConfig.output.publicPath = '//production.cdn.com/build/client/';
}

export default webpackServerConfig;
