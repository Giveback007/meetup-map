import { writable } from "svelte/store";

window.addEventListener('pwa', () => pwaIsReadyToInstall.set(!!pwa.installPrompt));
export const pwaIsReadyToInstall = writable<boolean>(false);

pwaIsReadyToInstall.subscribe(val => log(val));