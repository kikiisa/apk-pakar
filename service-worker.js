const CACHE_NAME = 'SW-005';
const toCache = [
    '/',
    'css/about.817c1ffc.css',
    'js/about.a2790874.js',
    'css/app.63430695.css',
    'css/chunk-vendors.bd0d8022.css',
    'js/app.834530e8.js',
    'js/chunk-vendors.27ffc6b4.js',
    'css/chunk-vendors.bd0d8022.css"',
    'css/app.63430695.css"',
    'img/user.png',

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
