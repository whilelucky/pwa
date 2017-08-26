export default (chunkName) => {
  if (
    !__BROWSER__
    || !(chunkName in window.__ASSETS_MANIFEST__)
    || !window.__ASSETS_MANIFEST__[chunkName].css
  ) {
    return Promise.reject(new Error(`css chunk not found: ${chunkName}`));
  } else if (document.getElementById(`${chunkName}.css`)) {
    return Promise.resolve();
  }

  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.href = window.__ASSETS_MANIFEST__[chunkName].css;
  link.id = `${chunkName}.css`;
  link.rel = 'stylesheet';
  link.media = 'only x';

  return new Promise((resolve, reject) => {
    let timeout;

    link.onload = () => {
      link.onload = null;
      link.onerror = null;
      link.media = 'all';
      clearTimeout(timeout);
      resolve();
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
