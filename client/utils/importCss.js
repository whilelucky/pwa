export default (chunkName) => {
  if (!__BROWSER__) {
    return Promise.resolve();
  } else if (!(chunkName in window.__ASSETS_MANIFEST__)) {
    return Promise.reject(`chunk not found: ${chunkName}`);
  } else if (!window.__ASSETS_MANIFEST__[chunkName].css) {
    return Promise.resolve(`chunk css does not exist: ${chunkName}`);
  } else if (document.getElementById(`${chunkName}.css`)) {
    return Promise.resolve(`css chunk already loaded: ${chunkName}`);
  }

  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.href = window.__ASSETS_MANIFEST__[chunkName].css;
  link.id = `${chunkName}.css`;
  link.rel = 'stylesheet';

  return new Promise((resolve, reject) => {
    let timeout;

    link.onload = () => {
      link.onload = null;
      link.onerror = null;
      clearTimeout(timeout);
      resolve(`css chunk loaded: ${chunkName}`);
    };

    link.onerror = () => {
      link.onload = null;
      link.onerror = null;
      clearTimeout(timeout);
      reject(new Error(`could not load css chunk: ${chunkName}`));
    };

    timeout = setTimeout(link.onerror, 30000);
    head.appendChild(link);
  });
};
