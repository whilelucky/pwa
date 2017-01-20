import 'babel-polyfill';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import slashes from 'connect-slashes';
import reactMiddleware from './middlewares/reactMiddleware';

const __PORT__ = process.env.PORT || 8000;
const app = express();

app
  .set('trust proxy', true)
  .use(compression())
  .use('/build', express.static('build'))
  .use('/serviceWorker.js', express.static('build/client/js/serviceWorker.js'))
  .use(morgan(__LOCAL__ ? 'dev' : 'combined'))
  .use(slashes(true))
  .use(reactMiddleware)
  .listen(__PORT__, () => {
    // eslint-disable-next-line
    console.info(`pwa is running as ${__PWA_ENV__} on port ${__PORT__}`);
  });
