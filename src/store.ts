import { writable } from "svelte/store";

window.addEventListener('pwa', () => pwaIsReadyToInstall.set(!!pwa.installPrompt));
export const pwaIsReadyToInstall = writable<boolean>(false);

export const eventTopicCategories = writable<TopicCategorie[]>([]);

export const appIsLoading = writable<boolean>(true);