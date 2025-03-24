// Change this to your repository name
const GHPATH = '/pwa';

// Cache versioning
const APP_PREFIX = 'gppwa_';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

// Files to cache for offline use
const URLS = [
    `${GHPATH}/`,
    `${GHPATH}/index.html`,
    `${GHPATH}/styles.css`,
    `${GHPATH}/app.js`
];

// Install Event - Caching Files
self.addEventListener('install', event => {
    console.log('Service Worker Installed');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(URLS);
        })
    );
});

// Activate Event - Clear Old Cache
self.addEventListener('activate', event => {
    console.log('Service Worker Activated');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => cache !== CACHE_NAME)
                .map(cache => caches.delete(cache))
            );
        })
    );
});

// Fetch Event - Serve Cached Files
self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
