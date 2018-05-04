
var cacheName = 'helloWorld'

console.log('In service worker.');

self.addEventListener('install', event => {
  console.log("install event");
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll([
      'index.html','bundle.js'
    ]))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', function (event) {
  console.log("fetch event");
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  )
});

self.addEventListener('activate', function () {
    console.log('Activated');
});

// service-worker.js
self.addEventListener('message', function(event) {
    console.log(event.data);

  /* var promise =self.clients.matchAll().then(function(clients) {
    clients.forEach(function(client) {
        client.postMessage('Service worker attached.');
    })
  });

    if (event.waitUntil) {
        event.waitUntil(promise);
    }*/
});

/*const onPush = function(event) {
   
  
  console.log("push event");
   if (Notification.permission == "granted") {
    event.waitUntil(self.registration.showNotification('New Post Arrival', {
        icon: '/assets/icon-512.png'
    }));
  }else if (Notification.permission != "denied") {
            Notification.requestPermission(function (permission) {
              if (Notification.permission == "granted") {
            event.waitUntil(self.registration.showNotification('New Post Arrival', {
        icon: '/assets/icon-512.png'
    }));
          }
            });
};*/
self.addEventListener('push',  function(event) {
   
       console.log("push event");
});
