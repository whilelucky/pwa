import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Wrapper from './views/Wrapper/Wrapper';
import NotFound from './views/NotFound/NotFound';
import importCss from './services/importCss';

export default (
  <Route path="/" component={Wrapper}>

    <IndexRoute
      name="landing"
      getComponent={(_, cb) => {
        Promise.all([
          import('./views/LandingPage/LandingPage' /* webpackChunkName: 'landing' */),
          importCss('landing'),
        ]).then(([module]) => cb(null, module.default));
      }}
    />

    <Route path="*" component={NotFound} />

  </Route>
);
