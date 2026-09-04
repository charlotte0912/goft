const CACHE_NAME = 'golf-activity-v1';

const APP_SHELL = [
  './',
  './login.html',
  './index.html',
  './css/card.css',
  './css/webAppStyle.css',
  './css/buttonStyle.css',
  './css/DateBarStyle.css',
  './js/app-core.js',
  './js/renderer.js',
  './js/date-controls.js',
  './js/timer.js',
  './Img/icon-180.png',
  './Img/icon-512.png',
  './Img/icon-maskable-192.png',
  './Img/icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('./login.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
