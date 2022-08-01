const CACHE_NAME = 'SW-001';
const toCache = [
    '/',
    'js/web.webmanifest',
    'css/app.3d79baa2.css',
    'css/about.837e70d8.css',
    'css/chunk-vendors.bd0d8022.css',
    'js/app.ba0cb655.js',
    'js/app.ba0cb655.js.map',
    'js/chunk-vendors.9ce14e71.js',
    'js/chunk-vendors.9ce14e71.js.map',
    'js/register.js',
    'img/priority.png',
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
