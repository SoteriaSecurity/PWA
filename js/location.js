let latitude = null;
let longitude = null;

export function requestLocationPermission(callback) {
    if (latitude !== null && longitude !== null) {
        if (callback) callback(latitude, longitude);
        return;
    }

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;

                if (callback) callback(latitude, longitude);
            },
            error => {
                if (error.code === error.PERMISSION_DENIED) {
                    console.warn('Location permission denied by the user.');
                } else {
                    console.error('Error requesting location permission:', error.message);
                }

                if (callback) callback(null, null);
            }, {
                timeout: 10 * 1000,
                enableHighAccuracy: true
            }
        );
    } else {
        if (callback) callback(null, null);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('enabler').addEventListener('click', (event) => {
        event.preventDefault();
        requestLocationPermission();
    });
});
