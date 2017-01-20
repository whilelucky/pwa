/* eslint-disable import/no-unresolved */
import React from 'react';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import html from '../render/html';
import configureStore from '../../client/redux/configureStore';
import routes from '../../client/routes';
import assetsMap from '../../build/client/assetsMap.json';

const serverRenderedChunks = async (req, res, renderProps) => {
  const store = configureStore();

  res.set('Content-Type', 'text/html');

  const topHtmlChunk = html.top(assetsMap);
  res.write(topHtmlChunk);
  res.flush();

  await loadOnServer({ ...renderProps, store });

  const coreHtmlChunk = html.core(
    __LOCAL__ ? '' : renderToString(
      <Provider store={store} key="provider">
        <ReduxAsyncConnect {...renderProps} />
      </Provider>,
    ),
    Helmet.rewind(),
    store.getState(),
  );
  res.write(coreHtmlChunk);
  res.flush();

  const bottomHtmlChunk = html.bottom(assetsMap, req.ip);
  res.write(bottomHtmlChunk);
  res.flush();

  res.end();
};

export default (req, res) => {
  match({
    routes,
    location: req.originalUrl,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      return res.status(500).send(error.message);
    } else if (redirectLocation) {
      return res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (!renderProps) {
      return res.status(404).send('404: Not Found');
    }
    return serverRenderedChunks(req, res, renderProps);
  });
};
