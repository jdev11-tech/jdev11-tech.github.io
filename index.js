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
