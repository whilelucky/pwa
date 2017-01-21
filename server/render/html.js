/* eslint-disable indent, quotes, max-len */
import scripts from './scripts';

export default {
  top(assetsMap) {
    return [
      `<!doctype html>`,
      `<html lang="en">`,
        `<head>`,
          `<link rel="dns-prefetch" href="//static.cdn.com">`,
          `<link rel="dns-prefetch" href="//images.cdn.com">`,
          __LOCAL__ ? `` : `<link rel="stylesheet" href="${assetsMap.main.css}">`,
          `<link rel="preload" as="script" href="${assetsMap.manifest.js}">`,
          `<link rel="preload" as="script" href="${assetsMap.vendor.js}">`,
          `<link rel="preload" as="script" href="${assetsMap.main.js}">`,
          `<meta charset="utf-8">`,
          `<meta name="viewport" content="width=device-width, initial-scale=1">`,
          `<link rel="icon" type="image/x-icon" href="//images.cdn.com/favicon.ico">`,
          __LOCAL__ ? `` : `<link rel="manifest" href="/manifest.json">`,
          `<script defer src="${assetsMap.Home.js}"></script>`,
    ].join('');
  },

  core(content, head, initialState) {
    return [
          `${head.title.toString()}`,
          `${head.meta.toString()}`,
          `${head.link.toString()}`,
        `</head>`,
        `<body>`,
          `<script>${scripts.firstPaint}</script>`,
          `<div id="root">${content}</div>`,
          `<script>${scripts.initialState(initialState)}</script>`,
    ].join('');
  },

  bottom(assetsMap, ip) {
    return [
          __LOCAL__ ? `` : `<script>${scripts.serviceWorker}</script>`,
          `<script>${scripts.analytics(ip)}</script>`,
          `<script src="${assetsMap.manifest.js}"></script>`,
          `<script src="${assetsMap.vendor.js}"></script>`,
          `<script src="${assetsMap.main.js}"></script>`,
        `</body>`,
      `</html>`,
    ].join('');
  },
};
