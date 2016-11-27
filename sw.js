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
                './font/roboto/Roboto-Bold.eot',
                './font/roboto/Roboto-Bold.ttf',
                './font/roboto/Roboto-Bold.woff',
                './font/roboto/Roboto-Bold.woff2',
                './font/roboto/Roboto-Light.eot',
                './font/roboto/Roboto-Light.ttf',
                './font/roboto/Roboto-Light.woff',
                './font/roboto/Roboto-Light.woff2',
                './font/roboto/Roboto-Medium.eot',
                './font/roboto/Roboto-Medium.ttf',
                './font/roboto/Roboto-Medium.woff',
                './font/roboto/Roboto-Medium.woff2',
                './font/roboto/Roboto-Regular.eot',
                './font/roboto/Roboto-Regular.ttf',
                './font/roboto/Roboto-Regular.woff',
                './font/roboto/Roboto-Regular.woff2',
                './font/roboto/Roboto-Thin.eot',
                './font/roboto/Roboto-Thin.ttf',
                './font/roboto/Roboto-Thin.woff',
                './font/roboto/Roboto-Thin.woff2',
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