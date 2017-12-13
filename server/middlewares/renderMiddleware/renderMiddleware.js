import React from 'react';
import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import configureStore from '../../../client/store/configureStore';
import routes from '../../../client/routes';
import html from './html';

const PWA_SSR = process.env.PWA_SSR === 'true';

const serverRenderedChunks = async (req, res, renderProps) => {
  const route = renderProps.routes[renderProps.routes.length - 1];
  const store = configureStore();
  const chunks = [];

  res.set('Content-Type', 'text/html');

  const earlyChunk = html.earlyChunk(route);
  res.write(earlyChunk);
  res.flush();

  if (PWA_SSR) await loadOnServer({ ...renderProps, store });

  const lateChunk = html.lateChunk(
    PWA_SSR ? renderToString(
      <Loadable.Capture report={(name) => chunks.push(name.replace(/.*\//, ''))}>
        <Provider store={store} key="provider">
          <ReduxAsyncConnect {...renderProps} />
        </Provider>
      </Loadable.Capture>,
    ) : '',
    Helmet.renderStatic(),
    store.getState(),
    route,
    chunks,
  );

  res.end(lateChunk);
};

export default (req, res) => {
  match({
    routes,
    location: req.originalUrl,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      return res.status(500).send(error.message);
    } else if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      return serverRenderedChunks(req, res, renderProps);
    }
    return res.status(404).send('404: Not Found');
  });
};
