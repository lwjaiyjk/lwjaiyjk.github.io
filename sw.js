// 此处代码 后面相关章节会去说明
var cacheName = 'helloWorld'

console.log('In service worker.');

self.addEventListener('install', event => {
  console.log("install event");
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll([
      'index.html'
    ]))
  )
})

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
})

self.addEventListener('activate', function () {
    console.log('Activated');
});

// service-worker.js
self.addEventListener('message', function(event) {
    console.log(event.data);

   var promise =self.clients.matchAll().then(function(clients) {
    clients.forEach(function(client) {
        client.postMessage('Service worker attached.');
    })
  });

    if (event.waitUntil) {
        event.waitUntil(promise);
    }
});

const onPush = function(event) {
   Notification.requestPermission(function(status) {  
            //status是授权状态，如果用户允许显示桌面通知，则status为'granted'  
            console.log('status: ' + status);  
  
            //permission只读属性  
            var permission = Notification.permission;  
            //default 用户没有接收或拒绝授权 不能显示通知  
            //granted 用户接受授权 允许显示通知  
            //denied  用户拒绝授权 不允许显示通知  
  
            console.log('permission: ' + permission);  
        });  
  
  console.log("push event");
    event.waitUntil(self.registration.showNotification('New Post Arrival', {
        icon: '/assets/icon-512.png'
    }));
};



self.addEventListener('push', onPush);
