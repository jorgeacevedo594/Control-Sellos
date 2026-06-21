const PREFIX='esm-sellos-';
const CACHE=PREFIX+'v1';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(
  caches.keys().then(ks=>Promise.all(
    ks.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k))
  )).then(()=>self.clients.claim())
);});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET')return;
  const url=new URL(req.url);
  const isLib=/jsdelivr|tessdata|unpkg|cdn/.test(url.host)||/tesseract|jspdf|traineddata|\.wasm/.test(url.pathname);
  if(isLib){
    e.respondWith(caches.open(CACHE).then(async c=>{
      const hit=await c.match(req); if(hit)return hit;
      try{const r=await fetch(req);if(r&&r.status===200)c.put(req,r.clone());return r;}catch(err){return hit||Response.error();}
    })); return;
  }
  e.respondWith(fetch(req).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(req,cp));return r;}).catch(()=>caches.match(req).then(h=>h||caches.match('./index.html'))));
});
