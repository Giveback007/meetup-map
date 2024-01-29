import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
// import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   strategies: "injectManifest",
    //   injectManifest: {
    //     swSrc: 'public/sw.js',
    //     swDest: 'dist/sw.js',
    //     globDirectory: 'dist',
    //     globPatterns: [
    //       '**/*.{html,js,css,json, png}',
    //     ],
    //   },
    //   injectRegister: false,
    //   manifest: false,
    //   devOptions: {
    //     enabled: true
    //   }
    // })
  ],
});

