let latitude = null;
let longitude = null;

export function requestLocationPermission(callback) {
    if (latitude !== null && longitude !== null) {
        console.log('Location already available');
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
                if (error.code === error.PERMISSION_DENIED) {
                    console.warn('Location permission denied by the user.');
                    updateLocationDisplay(true, 'Location ⛔');
                } else {
                    console.error('Error requesting location permission:', error.message);
                    updateLocationDisplay(true, 'Location ❓');
                }

                if (callback) callback(null, null);
            }
        );
    } else {
        console.log('Geolocation is not supported by this browser.');
        updateLocationDisplay(true, 'Location ❌');
        if (callback) callback(null, null);
    }
}

function updateLocationDisplay(failed = false, message = '') {
    const locationText = document.getElementById('location');

    if (!failed) {
        locationText.innerHTML = `<span class="success">Location ✅</span>`;
    } else {
        locationText.innerHTML = `<span class="failure">${message || 'Location not shared!'}</span>`;
    }
}

document.getElementById('enabler').addEventListener('click', (event) => {
    event.preventDefault();
    requestLocationPermission();
});
