/* eslint-disable global-require, import/no-extraneous-dependencies, import/no-unresolved, import/no-webpack-loader-syntax, max-len */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Wrapper from '../containers/Wrapper/Wrapper';
import NotFound from '../components/NotFound/NotFound';

const lazy = (bundle) => (nextState, cb) =>
  bundle((module) => cb(null, module.default));

export default (
  <Route path="/" component={Wrapper}>

    <IndexRoute
      name="landing"
      getComponent={lazy(require('bundle-loader?lazy&name=Home!../containers/LandingPage/LandingPage'))}
    />

    <Route path="*" component={NotFound} />

  </Route>
);
