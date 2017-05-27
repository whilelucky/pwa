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
  firstPaint: 'performance&&performance.mark&&performance.mark("firstPaint");',

  initialState(initialState) {
    return `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};`;
  },

  loadCSS: 'var loadCSS=function(e,n,t){function r(e){return d.body?e():void setTimeout(function(){r(e)})}function i(){a.addEventListener&&a.removeEventListener("load",i),a.media=t||"all"}var o,d=window.document,a=d.createElement("link");if(n)o=n;else{var l=d.getElementsByTagName("style");o=l[l.length-1]}var s=d.styleSheets;a.rel="stylesheet",a.href=e,a.media="only x",r(function(){o.parentNode.insertBefore(a,n?o:o.nextSibling)});var f=function(e){for(var n=a.href,t=s.length;t--;)if(s[t].href===n)return e();setTimeout(function(){f(e)})};return a.addEventListener&&a.addEventListener("load",i),a.onloadcssdefined=f,f(i),a};',

  loadRemainingCSS(route) {
    return Object.keys(assetsManifest)
      .filter((entry) => assetsManifest[entry].css && entry !== route.name && entry !== 'main')
      .reduce((str, entry) => `${str}loadCSS("${assetsManifest[entry].css}");`, this.loadCSS);
  },

  serviceWorker: '"serviceWorker"in window.navigator&&window.addEventListener("load",function(){window.navigator.serviceWorker.register("/serviceWorker.js").then(function(r){console.log("ServiceWorker registration successful with scope: ",r.scope)}).catch(function(e){console.error("ServiceWorker registration failed: ",e)})});',
};
