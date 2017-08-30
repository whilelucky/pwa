import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Wrapper from '../components/Wrapper/Wrapper';
import NotFound from '../components/NotFound/NotFound';
import importCss from '../../services/importCss';

const loadRoute = (cb) => (module) => cb(null, module.default);
const failRoute = (cb) => (error) => cb(error, null);

export default (
  <Route path="/" component={Wrapper}>

    <IndexRoute
      name="landing"
      getComponent={
        (_, cb) => {
          import('../components/LandingPage/LandingPage' /* webpackChunkName: 'landing' */).then(loadRoute(cb)).catch(failRoute(cb));
          importCss('landing');
        }
      }
    />

    <Route path="*" component={NotFound} />

  </Route>
);
