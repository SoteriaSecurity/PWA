export function checkAll() {
    console.log("check all");
    checkNotificationPermission();
    checkLocationPermission();
}

function checkNotificationPermission() {
    const notificationStatus = document.getElementById('notification');

    if (Notification.permission === 'granted') {
        notificationStatus.innerHTML = `<span class="success">Notifications ✅</span>`;
    } else if (Notification.permission === 'denied') {
        notificationStatus.innerHTML = `<span class="failure">Notifications ⛔</span>`;
    } else {
        notificationStatus.innerHTML = `<span class="failure">Notifications❓</span>`;
    }
}

function checkLocationPermission() {
    const locationText = document.getElementById('location');

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            () => { locationText.innerHTML = `<span class="success">Location ✅</span>`; }
            , e => {
                if (e.code === e.PERMISSION_DENIED) locationText.innerHTML = `<span class="failure">Location ⛔</span>`;
                else if (e.code === e.TIMEOUT) locationText.innerHTML = `<span class="failure">Location ⏳</span>`;
                else locationText.innerHTML = `<span class="failure">Location ❓</span>`;
            }, {
                timeout: 20 * 1000,
                enableHighAccuracy: true
            }
        );
    } else {
        locationText.innerHTML = `<span class="failure">Location ❌</span>`;
    }
}

checkAll();

document.getElementById('enabler').addEventListener('click', () => {
    checkAll();
});