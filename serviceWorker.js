
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

const cacheName = 'my-app-cache-v2';
const dynamicCacheName = 'my-app-dynamic-cache-v1';

const assetsManifest = [
  { url: '/', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/styles.css', revision: '1' },
  { url: '/app.js', revision: '1' },
  { url: '/icon.png', revision: '1' },
  { url: '/background.mp3', revision: '2' },
  { url: '/click.mp3', revision: '2' },
  { url: '/celebration.mp3', revision: '2' },
  // Add more assets as needed
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Opened cache');
      return cache.addAll(assetsManifest.map(asset => asset.url))
        .then(() => console.log('Assets added to cache'))
        .catch(error => console.error('Error adding assets to cache:', error));
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== cacheName && key !== dynamicCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

workbox.routing.registerRoute(
    new RegExp('.*\.mp3'),
    new workbox.strategies.NetworkFirst({
      cacheName: dynamicCacheName,
    })
  );
  


// ... (other route registrations)

// Additional logging for debugging
self.addEventListener('fetch', event => {
  console.log('Fetch event:', event);
});
