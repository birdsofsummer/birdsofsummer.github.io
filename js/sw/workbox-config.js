module.exports = {
  cacheId: 'my-app',
  importScripts: ["/js/proxy/proxy.js"],
  "globDirectory": "static/",
  "globPatterns": [
    "**/*.{html,json,css,ico,woff,ttf,eot,woff2,jpg,png,js}"
  ],
  "swDest": "static/sw.js",
  "importWorkboxFrom":"local",
  "cleanupOutdatedCaches": true,
   navigationPreload: true,
   //ignoreURLParametersMatching: [/./],
   runtimeCaching: [
    {
      urlPattern: ({event}) => event.request.mode === 'navigate',
      handler: 'NetworkOnly',
    },
    {urlPattern: /i/,
    handler: 'NetworkFirst',
    options: {
      networkTimeoutSeconds: 10,
      cacheName: 'my-api-cache',
      expiration: {
        maxEntries: 5,
        maxAgeSeconds: 60,
      },
      backgroundSync: {
        name: 'my-queue-name',
        options: {
          maxRetentionTime: 60 * 60,
        },
      },
      cacheableResponse: {
        statuses: [0, 200],
        headers: {'x-test': 'true'},
      },
      broadcastUpdate: {
        channelName: 'my-update-channel',
      },
      plugins: [
          {cacheDidUpdate: () => {console.log('zzzzzzzzz'); }},
      ],
      fetchOptions: {
        mode: 'no-cors',
      },
      matchOptions: {
        ignoreSearch: true,
      },
    },
  }, {
    urlPattern: new RegExp('^https://.*facebook.*'),
    handler: 'StaleWhileRevalidate',
    options: {
      cacheableResponse: {
        statuses: [0, 200]
      }
    }
  },
   {
    urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
    handler: 'CacheFirst',
    options: {
      cacheName: 'images',
      expiration: {
        maxEntries: 10,
      },
    },
  }],
};
