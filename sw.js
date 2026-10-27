// Orb Rush service worker. BUMP the version number V on every update so players get the new files.
const V='orb-rush-v3',F=['./','index.html','game.js','ads.js','i18n.js','manifest.json','icon-192.png','icon-512.png','icon-maskable-512.png','privacy.html','about.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(c=>{
  const n=fetch(r).then(res=>{if(res.ok){const cp=res.clone();const u=new URL(r.url);u.search='';caches.open(V).then(x=>x.put(u.href,cp))}return res}).catch(()=>c);
  return c||n;
 }));
});