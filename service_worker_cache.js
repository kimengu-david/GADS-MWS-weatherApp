const cacheName="v1";
const cacheAssets=[
    'index.html',
    'main.js',
    'styles.css',
    '/images/bg.jpg'

];




//call install event
self.addEventListener('install',(e)=>{

    console.log("service worker installed");

    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache=>{

            console.log("service worker:caching files");
            cache.addAll(cacheAssets);
        })
        .then(()=>self.skipWaiting())
    );



})
//call activate event
self.addEventListener('activate',(e)=>{

    console.log("service worker activated");
    //Remove unwanted caches.

    e.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cache=>{

                if(cache!==cacheName){
                    console.log("service worker:clearing old cache");
                    return caches.delete(cache);

                }

                })
            )
        })
    );


});

//Call fetch event 

self.addEventListener('fetch',e=>{
    console.log("service worker:loading");
    e.respondWith(
        fetch(e.request).catch(()=>caches.match)
    )
})