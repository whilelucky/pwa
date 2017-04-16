import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Wrapper from '../containers/Wrapper/Wrapper';
import NotFound from '../components/NotFound/NotFound';

const load = (chunkPromise) => (_, cb) =>
  chunkPromise
    .then((module) => module.default)
    .then((page) => cb(null, page))
    .catch((error) => cb(error, null));

export default (
  <Route path="/" component={Wrapper}>

    <IndexRoute
      name="landing"
      getComponent={load(import('../containers/LandingPage/LandingPage' /* webpackChunkName: 'landing' */))}
    />

    <Route path="*" component={NotFound} />

  </Route>
);
