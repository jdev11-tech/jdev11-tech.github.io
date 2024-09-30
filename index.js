// Check the initial display mode
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
        registration.active.postMessage({ type: 'GET_DISPLAY_MODE' });
    });
}

// Listen for display mode changes
window.matchMedia('(display-mode: standalone)').addEventListener('change', (evt) => {
    let displayMode = evt.matches ? 'standalone' : 'browser';
    console.log('DISPLAY_MODE_CHANGED', displayMode);
    alert('DISPLAY_MODE_CHANGED: ' + displayMode);
});

document.addEventListener("DOMContentLoaded", function () {
    const pwaStatus = document.getElementById("pwa-status");
    if (navigator.serviceWorker.controller) {
        pwaStatus.textContent = "PWA is active";
    } else {
        pwaStatus.textContent = "PWA is inactive";
    }


});



function checkAppInstalled(packageName) {
    // Create the intent URL
    const intentUrl = `intent://scan/#Intent;scheme=market;package=${packageName};end`;

    // Create a hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // Set a timeout to check if the app was opened
    const timeout = setTimeout(() => {
        // If we reach this point, the app is likely not installed
        window.location.href = `https://play.google.com/store/apps/details?id=${packageName}`;
    }, 500);

    // Attempt to open the app
    iframe.src = intentUrl;

    // Listen for the blur event, which may indicate the app was opened
    window.addEventListener('blur', () => {
        clearTimeout(timeout);
        // The app might be installed and opened
        console.log('App may be installed');
    });
}

// Usage
checkAppInstalled('com.example.app');