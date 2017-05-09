/* eslint-disable max-len */
import { assets, scripts } from './fragments';

export default {
  earlyChunk(route) {
    return `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
          <link rel="preconnect" href="//static.cdn.com">
          <link rel="preconnect" href="//images.cdn.com">
          <link rel="preload" as="script" href="${assets.webpackManifest.js}">
          <link rel="preload" as="script" href="${assets.vendor.js}">
          <link rel="preload" as="script" href="${assets.main.js}">
          ${!assets[route.name] ? '' : `<link rel="preload" as="script" href="${assets[route.name].js}">`}`;
  },

  lateChunk(app, head, initialState, route, ip) {
    return `
          ${__LOCAL__ ? '' : `<style>${assets.main.styles}</style>`}
          ${__LOCAL__ || !assets[route.name] ? '' : `<style>${assets[route.name].styles}</style>`}
          <link rel="icon" type="image/x-icon" href="//images.cdn.com/favicon.ico">
          ${__LOCAL__ ? '' : '<link rel="manifest" href="/manifest.json">'}
          <meta name="theme-color" content="#5500eb">
          ${head.title.toString()}
          ${head.meta.toString()}
          ${head.link.toString()}
          ${head.script.toString()}
        </head>
        <body>
          <div id="root">${app}</div>
          <script>${scripts.firstPaint}</script>
          <script>${scripts.initialState(initialState)}</script>
          <script src="${assets.webpackManifest.js}"></script>
          <script src="${assets.vendor.js}"></script>
          <script src="${assets.main.js}"></script>
          ${__LOCAL__ ? '' : `<script>${scripts.loadRemainingCSS(route)}</script>`}
          ${__LOCAL__ ? '' : `<script>${scripts.serviceWorker}</script>`}
          <script>${scripts.analytics(ip)}</script>
        </body>
      </html>`;
  },
};
