// Nama cache dinaikkan ke v8 untuk memperbarui jalur folder ./img/
const CACHE_NAME = 'ksafe-cache-v8';

// Daftar file yang wajib disimpan di memori HP untuk mode offline
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.jpg',
  './img/masker.jpg',
  './img/kacamata.jpg',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// Install Service Worker dan simpan semua file di atas
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Hapus cache versi lama agar tidak menumpuk
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

// Gunakan cache saat offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
