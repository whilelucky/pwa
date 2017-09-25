/* eslint-disable max-len, import/no-unresolved */
import fs from 'fs';
import assetsManifest from '../../build/client/assetsManifest.json';

export const assets = Object.keys(assetsManifest)
  .reduce((obj, entry) => ({
    ...obj,
    [entry]: {
      ...assetsManifest[entry],
      styles: assetsManifest[entry].css
        ? fs.readFileSync(`build/client/css/${assetsManifest[entry].css.split('/').pop()}`, 'utf8')
        : undefined,
    },
  }), {});

export const scripts = {
  serviceWorker: `
    if('serviceWorker' in window.navigator) {
      window.addEventListener('load', function() {
        window.navigator.serviceWorker.register("/serviceWorker.js").then(function(registration) {
          console.log("ServiceWorker registration successful with scope: ", registration.scope);
        }).catch(function(error) {
          console.error("ServiceWorker registration failed: ", error);
        });
      });
    }
  `,
};
