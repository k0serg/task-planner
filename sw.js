const CACHE_NAME = "task-planner-cache-v1";
const ASSETS_TO_CACHE = [
  "/task-planner/",
  "/task-planner/index.html",
  "/task-planner/manifest.json",
  "/task-planner/icon-192.png",
  "/task-planner/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});
