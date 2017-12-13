import 'babel-polyfill';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import slashes from 'connect-slashes';
import Loadable from 'react-loadable';
import renderMiddleware from './middlewares/renderMiddleware/renderMiddleware';

const app = express();
app.use(helmet({ dnsPrefetchControl: false }));
app.use(compression());
app.use(morgan(__LOCAL__ ? 'dev' : 'combined'));
app.use('/build/client', express.static('build/client'));
app.use('/serviceWorker.js', express.static('build/client/serviceWorker.js'));
app.use('/manifest.json', express.static('build/client/manifest.json'));
app.use(slashes(true));
app.use(renderMiddleware);

const PORT = process.env.PORT || 8000;
Loadable.preloadAll().then(() => {
  app.listen(PORT, () => {
    // eslint-disable-next-line
    console.info(`pwa is running as ${__PWA_ENV__} on port ${PORT}`);
  });
});
