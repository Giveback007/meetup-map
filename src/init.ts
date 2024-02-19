import { Workbox } from 'workbox-window';
import { key } from './key';
    
{
    const isDev = import.meta.env.DEV;
    const isProd = import.meta.env.PROD;
    if (!isDev && !isProd) throw new Error('Unhandled Mode');

    const globals: Globals = {
        env: {
            isDev,
            isProd,
            env: isDev ? 'dev' : 'prod',
            isLocalhost: Boolean(
                window.location.hostname === 'localhost' ||
                // [::1] is the IPv6 localhost address.
                window.location.hostname === '[::1]' ||
                // 127.0.0.0/8 are considered localhost for IPv4.
                window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
            ),
            ...key
        },
        pwa: {
            isStandalone: () =>
                !!window.matchMedia('(display-mode: standalone)').matches
                ||
                !!(navigator as any).standalone
                ||
                !!document.referrer.startsWith('android-app://'),
            installPrompt: null,
        },

        log: console.log,
    }

    Object.assign(globalThis, globals);

    // -- PWA -- //
    if (
        isProd &&
        "serviceWorker" in navigator
    ) {
        const wb = new Workbox('sw.js');

        wb.addEventListener('activated', event => {
            // `event.isUpdate` will be true if another version of the service
            // worker was controlling the page when this version was registered.
            if (!event.isUpdate)
                console.log('New service worker activated for the first time!');
        });

        // Register the service worker after event listeners have been added.
        wb.register();

        window.addEventListener('beforeinstallprompt', (e) => {
            log(e);

            // https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Trigger_install_prompt#listening_for_beforeinstallprompt
            e.preventDefault();

            setTimeout(() => {
                pwa.installPrompt = e as any;
                dispatchEvent(new Event('pwa'))
            });
        });

        window.addEventListener('appinstalled', (e) => {
            log(e);

            setTimeout(() => {
                pwa.installPrompt = null;
                dispatchEvent(new Event('pwa'))
            });
        });
    }
}
