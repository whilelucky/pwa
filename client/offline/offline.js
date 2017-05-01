/* eslint-disable */
self.addEventListener('fetch', (event) => {
  if (
    event.request.mode === 'navigate'
    || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))
  ) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(Array.from(urlsToCacheKeys.values()).find(v => v.match(/offline.*.html/))))
    );
  }
});
