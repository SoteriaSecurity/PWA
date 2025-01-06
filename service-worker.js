self.addEventListener('install', event => {
    console.log('Service Worker: Installed');
    event.waitUntil(
        caches.open('static-cache').then(cache => {
            cache.addAll([
                '/',
                '/index.html',
                '/css/styles.css',
                '/js/location.js',
                '/assets/icon-192x192.png',
                '/assets/icon-512x512.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('sync', event => {
    if (event.tag === 'sync-location') {
        event.waitUntil(
            fetch('/update-location', {
                method: 'POST',
                body: JSON.stringify({ latitude: 0, longitude: 0 }),
                headers: { 'Content-Type': 'application/json' }
            })
        );
    }
});

self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : {};
    event.waitUntil(
        self.registration.showNotification(data.title || 'Notification', {
            body: data.body || 'You have a new update!',
            icon: '/assets/icon-192x192.png'
        })
    );
});
