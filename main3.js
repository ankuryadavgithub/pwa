if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/your-repo-name/sw.js', { scope: '/your-repo-name/' })
    .then(() => console.log('Service Worker Registered'))
    .catch(() => console.log('Service Worker Registration Failed'));
}
