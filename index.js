let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallPrompt();
});

function showInstallPrompt() {
    const pwaStatus = document.getElementById("pwa-status");
    const installButton = document.getElementById('install-button');

    if (deferredPrompt) {
        pwaStatus.textContent = "PWA is available for installation";
        installButton.style.display = 'block';

        installButton.addEventListener('click', (e) => {
            installButton.style.display = 'none';
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                    pwaStatus.textContent = "PWA is installed";
                } else {
                    console.log('User dismissed the install prompt');
                    pwaStatus.textContent = "PWA installation was declined";
                }
                deferredPrompt = null;
            });
        });
    } else {
        // Check if the app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            pwaStatus.textContent = "PWA is already installed";
        } else {
            pwaStatus.textContent = "PWA is not available for installation";
        }
    }
}

window.addEventListener('appinstalled', (evt) => {
    console.log('App was installed');
    document.getElementById("pwa-status").textContent = "PWA was just installed";
});

// Check the initial display mode
if (window.matchMedia('(display-mode: standalone)').matches) {
    document.getElementById("pwa-status").textContent = "PWA is already installed";
}

// Listen for display mode changes
window.matchMedia('(display-mode: standalone)').addEventListener('change', (evt) => {
    let displayMode = evt.matches ? 'standalone' : 'browser';
    console.log('DISPLAY_MODE_CHANGED', displayMode);
    document.getElementById("pwa-status").textContent = "Display mode changed to: " + displayMode;
});

// Initialize the PWA status on page load
document.addEventListener("DOMContentLoaded", function () {
    showInstallPrompt();
});