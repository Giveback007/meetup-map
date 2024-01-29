import { Workbox } from 'workbox-window';

// -- PWA -- //
// env === 'prod' &&
if ( "serviceWorker" in navigator) {
    const wb = new Workbox('sw.js');

    wb.addEventListener('activated', event => {
        // `event.isUpdate` will be true if another version of the service
        // worker was controlling the page when this version was registered.
        if (!event.isUpdate)
            console.log('New service worker activated for the first time!');
    });

    // Register the service worker after event listeners have been added.
    wb.register();

    

    // addEventListener('load', () => {
    //     navigator.serviceWorker.register("/sw.js")
    //         .then(registration => {
    //             if (!!registration.installing) registration.update();
    //         })
    //         .catch((err) => console.log("Service worker registration failed", err)); 
    // });
}

window.addEventListener('beforrinstallprompt', (e) => {
    console.log(e);
    e.preventDefault();
  
});