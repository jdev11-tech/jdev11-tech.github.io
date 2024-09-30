let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    alert('beforeinstallprompt event fired');
    e.preventDefault();
    deferredPrompt = e;
    showInstallPrompt();
});

function showInstallPrompt() {
    const pwaStatus = document.getElementById("pwa-status");
    const installButton = document.getElementById('install-button');
    const openAppButton = document.getElementById('open-app-button');

    if (deferredPrompt) {
        pwaStatus.textContent = "PWA is available for installation";
        installButton.style.display = 'block';
        openAppButton.style.display = 'none';

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
            installButton.style.display = 'none';
            openAppButton.style.display = 'block';
        } else {
            pwaStatus.textContent = "PWA is not available for installation";
            installButton.style.display = 'none';
            openAppButton.style.display = 'none';
        }
    }

    // Check if the native Facebook app is installed
    if ('getInstalledRelatedApps' in navigator) {
        navigator.getInstalledRelatedApps().then((relatedApps) => {
            const facebookApp = relatedApps.find(app => app.id === 'com.facebook.katana');
            if (facebookApp) {
                pwaStatus.textContent = "Facebook app is installed";
                installButton.style.display = 'none';
                openAppButton.style.display = 'block';
                openAppButton.textContent = 'Open Facebook App';
                openAppButton.addEventListener('click', () => {
                    window.location.href = 'fb://';
                });
            }
        });
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