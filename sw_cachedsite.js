const cacheName="v2";





//call install event
self.addEventListener('install',(e)=>{

    console.log("service worker installed");

 



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
        fetch(e.request)
        .then(res=>{
            //clone the response
            const resClone=res.clone();
            //open cache
            caches
            .open(cacheName)
            .then(cache=>{
                //add response to cache
                cache.put(e.request,resClone);


            });
            return res;
        }).catch(err=>caches.match(e.request).then(res=>res))
    );
});