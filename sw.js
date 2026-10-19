/* ESM · Control de Sellos v2 — Service worker (permite abrir la app sin señal)
   Al cambiar CACHE (v3, v4...) los teléfonos borran la versión anterior. */
const PREFIX = 'esm-sellos-';
const CACHE = PREFIX + 'v3';
const JSPDF = 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js'; // librería del PDF (se guarda para usar sin señal)
const SHELL = ['./', './index.html', './data.js', './manifest.webmanifest', './icon-192.png', './icon-512.png',
  './img/logo-esm.png', './img/camion.jpg', './img/petrolera.jpg', './img/eds.jpg', './img/tanque.jpg'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL).then(() => c.add(JSPDF).catch(() => {}))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(
    ks.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isLib = /jsdelivr|unpkg|cdn/.test(url.host) || /jspdf/.test(url.pathname);
  if (isLib) { // librerías externas: primero caché
    e.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(req); if (hit) return hit;
      try { const r = await fetch(req); if (r && r.status === 200) c.put(req, r.clone()); return r; } catch (err) { return Response.error(); }
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  // archivos de la app: primero red (para recibir cambios), si no hay señal, caché
  e.respondWith(fetch(req).then(r => { if (r && r.status === 200) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); } return r; })
    .catch(() => caches.match(req).then(h => h || caches.match('./index.html'))));
});
