// use a cacheName for cache versioning
var cacheName = 'v1:static';

// during the install phase you usually want to cache static assets
self.addEventListener('install', function(e) {
    // once the SW is installed, go ahead and fetch the resources to make this work offline
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                './',
                './css/bootstrap.min.css',
                './css/mdb.min.css',
                './css/style.css',
                './js/build/script.min.js',
                './js/build/jquery-2.2.3.min.js',
                './js/build/bootstrap.min.js',
                './js/build/mdb.min.js',
                './js/build/tether.min.js',
                './js/build/knockout.min.js',
                './css/fonts/roboto.woff',
                './offline.html'
            ]).then(function() {
                self.skipWaiting();
            });
        })
    );
});

// when the browser fetches a url
self.addEventListener('fetch', function(event) {
    // either respond with the cached object or go ahead and fetch the actual url
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                // retrieve from cache
                return response;
            }
            // fetch as normal
            return fetch(event.request);
        })
    );
});