/* eslint-disable max-len, import/no-unresolved */
import assetsManifest from '../../build/client/assetsManifest.json';

export const assets = assetsManifest;

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
