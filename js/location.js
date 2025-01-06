let latitude = null;
let longitude = null;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.error('Service Worker registration failed:', err));
}

export function requestLocationPermission(callback) {
    if (latitude !== null && longitude !== null) {
        console.log('Location already available:', latitude, longitude);
        if (callback) callback(latitude, longitude);
        return;
    }

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                updateLocationDisplay();

                if (callback) callback(latitude, longitude);
            },
            error => {
                console.error('Error requesting location permission:', error.message);
                updateLocationDisplay(true);
                callback(null, null);
            }
        );
    } else {
        console.log('Geolocation is not supported by this browser.');
        updateLocationDisplay(true);
        callback(null, null);
    }
}

function updateLocationDisplay(failed = false) {
    const locationBox = document.getElementById('location');

    if (locationBox) {
        if (!failed) {
            locationBox.innerHTML = `<span id="success">You're being protected!</span>`;
        } else {
            locationBox.innerHTML = `<span id="failure">Location not shared!</span>`;
        }
    }
}
