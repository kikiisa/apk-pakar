const CACHE_NAME = 'V-2';
const toCache = [
    '/',
    'js/web.webmanifest',
    'css/about.f506abb1.css',
    'js/about.9a01f383.js',
    'css/app.3d79baa2.css',
    'css/chunk-vendors.bd0d8022.css',
    'js/app.ee231ffc.js',
    'js/chunk-vendors.9ce14e71.js',
    'css/chunk-vendors.bd0d8022.css',
    'css/app.3d79baa2.css',
    'img/bg.171d8de9.png',
    'img/profile.bb5e603c.jpg',
    'img/splash.png',
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