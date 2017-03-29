/* eslint-disable global-require, import/no-extraneous-dependencies, import/no-unresolved, import/no-webpack-loader-syntax, max-len */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Wrapper from '../containers/Wrapper/Wrapper';
import NotFound from '../components/NotFound/NotFound';

const load = (chunk) => (nextState, cb) => (
  __BROWSER__
    ? chunk((lazyChunk) => cb(null, lazyChunk.default))
    : cb(null, chunk.default)
);

export default (
  <Route path="/" component={Wrapper}>

    <IndexRoute
      name="landing"
      getComponent={
        __BROWSER__
          ? load(require('bundle-loader?lazy&name=Home!../containers/LandingPage/LandingPage'))
          : load(require('../containers/LandingPage/LandingPage'))
      }
    />

    <Route path="*" component={NotFound} />

  </Route>
);
