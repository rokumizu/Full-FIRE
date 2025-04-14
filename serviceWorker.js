// 📦 serviceWorker.js - オフライン対応キャッシュ

const CACHE_NAME = "MaSearch-cache-v1";
const urlsToCache = [
  "index.html",
  "style-mobile.css",
  "style-pc.css",
  "friction.html",
  "hydrant.html",
  "discharge.html",
  "manifest.json",
  "icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
