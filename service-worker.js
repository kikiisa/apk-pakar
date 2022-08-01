const CACHE_NAME = 'SW-001';
const toCache = [
    '/',
    'js/web.webmanifest',
    'css/app.16eb2bc1.css',
    'css/chunk-vendors.bd0d8022.css',
    'js/app.8ae159c6.js',
    'js/app.8ae159c6.js.map',
    'js/chunk-vendors.276f385f.js',
    'js/chunk-vendors.276f385f.js.map',
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
