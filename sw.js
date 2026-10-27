// Tiny service worker: caches the game so it loads fast and works offline.
const C='orb-rush-v1', F=['./','index.html','manifest.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
