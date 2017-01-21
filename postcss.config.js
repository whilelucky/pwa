/* eslint-disable global-require */
module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-url')(),
    require('postcss-extend')(),
    require('postcss-cssnext')(),
    require('postcss-reporter')(),
  ],
};
