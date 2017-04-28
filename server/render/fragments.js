/* eslint-disable max-len, import/no-unresolved */
import fs from 'fs';
import config from '../../config';
import assetsManifest from '../../build/client/assetsManifest.json';

export const assets = Object.keys(assetsManifest)
  .reduce((o, entry) => ({
    ...o,
    [entry]: {
      ...assetsManifest[entry],
      styles: assetsManifest[entry].css
        ? fs.readFileSync(`build/client/assets/css/${assetsManifest[entry].css.split('/').pop()}`, 'utf8')
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
      .reduce((s, entry) => `${s}loadCSS("${assetsManifest[entry].css}");`, this.loadCSS);
  },

  serviceWorker: '"serviceWorker"in window.navigator&&window.addEventListener("load",function(){window.navigator.serviceWorker.register("/serviceWorker.js").then(function(r){console.log("ServiceWorker registration successful with scope: ",r.scope)}).catch(function(e){console.error("ServiceWorker registration failed: ",e)})});',

  analytics(ip) {
    const allowAnalytics = !config.analyticsBlacklistedIps.some((blackListedIp) => blackListedIp === ip);
    return allowAnalytics
      ? `!function(){var a=window.analytics=window.analytics||[];if(!a.initialize)if(a.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{a.invoked=!0,a.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"],a.factory=function(r){return function(){var o=Array.prototype.slice.call(arguments);return o.unshift(r),a.push(o),a}};for(var r=0;r<a.methods.length;r++){var o=a.methods[r];a[o]=a.factory(o)}a.load=function(a){var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+a+"/analytics.min.js";var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(r,o)},a.SNIPPET_VERSION="3.1.0",a.load("${config.segmentAPIKey}")}}();`
      : null;
  },
};
