const CACHE_NAME = 'math-riddles-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/style.css',
  './css/components.css',
  './css/animations.css',
  './js/app.js',
  './js/data/levels.js',
  './js/data/themes.js',
  './js/core/audio.js',
  './js/core/storage.js',
  './js/core/validator.js',
  './js/ui/screenManager.js',
  './js/ui/keypad.js',
  './js/ui/puzzleRenderer.js',
  './js/ui/effects.js',
  './assets/bg-mountain.jpg',
  './assets/themes/arctic_frost.jpg',
  './assets/themes/celestial_void.jpg',
  './assets/themes/cosmic_nebula.jpg',
  './assets/themes/cyberpunk_neon.jpg',
  './assets/themes/ember_magma.jpg',
  './assets/themes/emerald_aurora.jpg',
  './assets/themes/golden_mirage.jpg',
  './assets/themes/oceanic_abyss.jpg',
  './assets/themes/sakura_twilight.jpg',
  './assets/themes/sunset_crimson.jpg',
  './assets/themes/tokyo_midnight.jpg',
  './assets/icons/icon-192.svg',
  './assets/icons/icon-512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('Cache addAll warning:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached, and update in background
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
