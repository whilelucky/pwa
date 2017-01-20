/* eslint-disable max-len */
import config from '../../config';

export default {
  serviceWorker: '"serviceWorker"in window.navigator&&window.navigator.serviceWorker.register("/serviceWorker.js").then(function(r){console.log("ServiceWorker registration successful with scope: ",r.scope)}).catch(function(e){console.error("ServiceWorker registration failed: ",e)});',

  firstPaint: 'performance&&performance.mark&&performance.mark("firstPaint");',

  initialState(initialState) {
    return `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};`;
  },

  analytics(ip) {
    const allowAnalytics = !config.analyticsBlacklistedIps.some((blackListedIp) => blackListedIp === ip);
    return allowAnalytics ? (
      `!function(){var a=window.analytics=window.analytics||[];if(!a.initialize)if(a.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{a.invoked=!0,a.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"],a.factory=function(r){return function(){var o=Array.prototype.slice.call(arguments);return o.unshift(r),a.push(o),a}};for(var r=0;r<a.methods.length;r++){var o=a.methods[r];a[o]=a.factory(o)}a.load=function(a){var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+a+"/analytics.min.js";var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(r,o)},a.SNIPPET_VERSION="3.1.0",a.load("${config.segmentAPIKey}")}}();`
    ) : (null);
  },
};
