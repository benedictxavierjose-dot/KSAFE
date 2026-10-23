// Nama cache dinaikkan ke v2 untuk memaksa pembaruan
const CACHE_NAME = 'ksafe-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.jpg',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Memaksa service worker baru langsung aktif
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Proses pembersihan cache/memori aplikasi yang lama
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
