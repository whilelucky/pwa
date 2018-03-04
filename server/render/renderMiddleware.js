import React from 'react';
import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ServerStyleSheet } from 'styled-components';
import createStore from '../../client/store/createStore';
import routes from '../../client/routes';
import execComponentWillServerRender from './execComponentWillServerRender';
import html from './html';

const PWA_SSR = process.env.PWA_SSR === 'true';

export default async (req, res) => {
  const location = req.originalUrl || req.url;
  const branches = matchRoutes(routes, location);
  const branch = branches[branches.length - 1];
  const sheet = new ServerStyleSheet();
  const store = createStore();
  const context = {};
  const chunks = [];

  res.set('Content-Type', 'text/html');

  const earlyChunk = html.earlyChunk(branch.route);
  res.write(earlyChunk);
  res.flush();

  if (PWA_SSR) {
    await execComponentWillServerRender(branches, { req, res, store });
  }

  const app = PWA_SSR ? renderToString(sheet.collectStyles(
    <Loadable.Capture report={(name) => chunks.push(name.replace(/.*\//, ''))}>
      <Provider store={store}>
        <StaticRouter location={location} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    </Loadable.Capture>,
  )) : '';

  const lateChunk = html.lateChunk(
    app,
    sheet.getStyleTags(),
    Helmet.renderStatic(),
    store.getState(),
    branch.route,
    chunks,
  );

  res.end(lateChunk);
};
