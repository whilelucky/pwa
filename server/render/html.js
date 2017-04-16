/* eslint-disable max-len */
import scripts from './scripts';

export default {
  top(assetsManifest) {
    return `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
          <meta name="theme-color" content="#5500eb">
          <link rel="preconnect" href="//static.cdn.com">
          <link rel="preconnect" href="//images.cdn.com">
          ${__LOCAL__ ? '' : `<link rel="stylesheet" href="${assetsManifest.main.css}">`}
          <link rel="preload" as="script" href="${assetsManifest.vendor.js}">
          <link rel="preload" as="script" href="${assetsManifest.main.js}">
          <link rel="preload" as="script" href="${assetsManifest.landing.js}">
          <link rel="icon" type="image/x-icon" href="//images.cdn.com/favicon.ico">
          ${__LOCAL__ ? '' : '<link rel="manifest" href="/manifest.json">'}`;
  },

  bottom(app, head, initialState, assetsManifest, ip) {
    return `
          ${head.title.toString()}
          ${head.meta.toString()}
          ${head.link.toString()}
          ${head.script.toString()}
        </head>
        <body>
          <script>${scripts.firstPaint}</script>
          <div id="root">${app}</div>
          <script>${scripts.initialState(initialState)}</script>
          <script>${assetsManifest.webpackManifest.text}</script>
          <script src="${assetsManifest.vendor.js}"></script>
          <script src="${assetsManifest.main.js}"></script>
          ${__LOCAL__ ? '' : `<script>${scripts.serviceWorker}</script>`}
          <script>${scripts.analytics(ip)}</script>
        </body>
      </html>`;
  },
};
