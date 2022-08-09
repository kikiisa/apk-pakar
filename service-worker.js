const CACHE_NAME = 'SW-005';
const toCache = [
    '/',
    'js/web.webmanifest',
    'css/about.1a49eb57.css',
    'css/app.676e8b36.css',
    'css/chunk-vendors.bd0d8022.css',
    'js/about.6dd58e37.js',
    'js/about.6dd58e37.js.map',
    'js/app.08148684.js',
    'js/app.08148684.js.map',
    'js/chunk-vendors.9ce14e71.js',
    'js/chunk-vendors.9ce14e71.js.map',
    'js/register.js',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(toCache)
        })
        .then(self.skipWaiting())
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request)
        .catch(() => {
            return caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.match(event.request)
            })
        })
    )
})

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
        .then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Hapus cache lama', key)
                    return caches.delete(key)
                }
            }))
        })
        .then(() => self.clients.claim())
    )
})
