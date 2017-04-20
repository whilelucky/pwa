import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Wrapper from '../containers/Wrapper/Wrapper';
import NotFound from '../components/NotFound/NotFound';

export default (
  <Route path="/" component={Wrapper}>

    <IndexRoute
      name="landing"
      getComponent={(_, cb) =>
        import('../containers/LandingPage/LandingPage' /* webpackChunkName: 'landing' */)
          .then((module) => cb(null, module.default))
          .catch((error) => cb(error, null))
      }
    />

    <Route path="*" component={NotFound} />

  </Route>
);
