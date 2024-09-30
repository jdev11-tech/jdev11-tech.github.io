// service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
});

self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
});

// Listen for the beforeinstallprompt event
self.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    console.log('beforeinstallprompt event fired');
    alert('beforeinstallprompt event fired');
});

// Listen for the appinstalled event
self.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed');
    alert('PWA was installed');
});

// Listen for display mode changes
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'GET_DISPLAY_MODE') {
        const displayMode = self.getPWADisplayMode();
        console.log('Current display mode:', displayMode);
        alert('Current display mode: ' + displayMode);
    }
});

// Function to get the current display mode
self.getPWADisplayMode = () => {
    if (navigator.standalone) {
        return 'standalone (iOS)';
    }
    if (matchMedia('(display-mode: standalone)').matches) {
        return 'standalone';
    }
    if (document.referrer.startsWith('android-app://')) {
        return 'twa';
    }
    return 'browser';
};