/* eslint-disable */
this.addEventListener('fetch', (event) => {
  if (
    event.request.mode === 'navigate'
    || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))
  ) {
    event.respondWith(
      fetch(event.request.url)
        .catch(() => caches.match('/build/client/offline/offline.html'))
    );
  }
});
