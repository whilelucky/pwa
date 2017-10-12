import React from 'react';
import { Route, IndexRoute } from 'react-router';
import importCss from 'core/importCss';
import NotFoundPage from 'core/components/NotFound/NotFound';
import Wrapper from 'wrapper/components/Wrapper/Wrapper';

export const loadRoute = {
  landing: () => Promise.all([
    import('landing/components/LandingPage/LandingPage' /* webpackChunkName: 'landing' */),
    importCss('landing'),
  ]),
};

export default (
  <Route path="/" component={Wrapper}>

    <IndexRoute
      name="landing"
      getComponent={(_, cb) => loadRoute.landing().then(([module]) => cb(null, module.default))}
    />

    <Route path="*" component={NotFoundPage} />

  </Route>
);
