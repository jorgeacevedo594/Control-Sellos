/* Control de Sellos se trasladó a https://sellos-esm.pages.dev
   Este service worker reemplaza al del prototipo: borra lo guardado y se elimina solo. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil((async function () {
    for (const k of await caches.keys()) await caches.delete(k);
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url);
  })());
});
