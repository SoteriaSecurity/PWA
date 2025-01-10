self.addEventListener('push', function(event) {
    const payload = event.data ? event.data.json() : {};
    const title = payload.title || 'Default Title';
    const options = {
        body: payload.body || 'Default Body',
        icon: payload.icon || 'https://www.soteria-security.us/assets/images/logo.svg'
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'simulate-push') {
        const data = event.data.payload || { title: 'Test Title', body: 'This is a test notification.' };
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: data.icon || 'https://www.soteria-security.us/assets/images/logo.svg',
        }).catch(err => {
            console.error('Failed to show notification:', err);
        });
    }
});

self.addEventListener('notificationclick', function(event) {
    let url = 'https://www.soteria-security.us/PWA';
    event.notification.close();

    event.waitUntil(
        clients.matchAll({ includeUncontrolled: true, type: 'window' }).then( windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                let client = windowClients[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
