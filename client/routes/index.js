import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Wrapper from '../containers/Wrapper/Wrapper';
import NotFound from '../components/NotFound/NotFound';

const loadRoute = (cb) => (module) => cb(null, module.default);
const errorRoute = (cb) => (error) => cb(error, null);

export default (
  <Route path="/" component={Wrapper}>

    <IndexRoute
      name="landing"
      getComponent={
        (_, cb) => import('../containers/LandingPage/LandingPage' /* webpackChunkName: 'landing' */)
          .then(loadRoute(cb)).catch(errorRoute(cb))
      }
    />

    <Route path="*" component={NotFound} />

  </Route>
);
