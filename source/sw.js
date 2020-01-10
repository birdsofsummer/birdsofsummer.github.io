importScripts("/js/sw/util.js");

self.addEventListener('install', (event)=> {
    self.skipWaiting();
    console.log('installed')
})

self.addEventListener('activate', (event)=>{
  event.waitUntil(clients.claim());
  event.waitUntil(async function() {
    if (self.registration.navigationPreload) {
      // Enable navigation preloads!
      await self.registration.navigationPreload.enable();
    }
  }())
})

self.addEventListener('notificationclick', (event)=> {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close()
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
      console.log(clientList)
      clientList
      .filter(x=x.url=='/' && 'focus' in x)
      .map(x=>x.focus())
      if (clients.openWindow) return clients.openWindow('/')
  }))
})


self.addEventListener('push', function(event) {
 // const payload = event.data ? event.data.text() : 'no payload';
  event.waitUntil(
   self.registration.showNotification('ccc', {
      body: "ddd",
    })
  );
});



self.addEventListener('fetch', e => {
    console.log(e)
      //e.respondWith(proxy(e.request))
    const {url, method, headers, body, }=e.request
    console.log({url, method, headers,})
})
