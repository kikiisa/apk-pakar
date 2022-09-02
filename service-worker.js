const CACHE_NAME = 'SW-003';
const toCache = [
    '/',
    'css/about.8c3e4c89.css',
    'js/about.44f3a4cb.js',
    'css/app.63430695.css',
    'css/chunk-vendors.bd0d8022.css',
    'js/app.a2b64741.js',
    'js/chunk-vendors.27ffc6b4.js',
    'css/chunk-vendors.bd0d8022.css',
    'css/app.63430695.css',
    'js/chunk-vendors.27ffc6b4.js',
    'js/app.a2b64741.js',
    'img/user.png'
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
