import { generateSW } from 'workbox-build';

console.log('Workbox...');

// https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW
generateSW({
    skipWaiting: true,
    clientsClaim: true,
    cleanupOutdatedCaches: true,
    navigateFallback: '/index.html',
    globDirectory: "dist/",
    globPatterns: [
      // "**/*.{html,js,css,png,jpg,jpeg,svg,gif,ico,json,woff,woff2,eot,webmanifest,map}"
      '**/*.*',
      '**/*',
    ],
    swDest: "dist/sw.js",
    maximumFileSizeToCacheInBytes: 10_000_000,
    runtimeCaching: [{
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
      handler: 'CacheFirst',
      options: { cacheName: "images" }
    }],
});
