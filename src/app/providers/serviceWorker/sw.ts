/// <reference lib="WebWorker" />

// export empty type because of tsc --isolatedModules flag
export type {};
declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'cache_epic';

const INIT_CACHE_PATHS = [
    '/',
    '/public/index.js',
    '/public/index.html',
    '/public/default-profile-pic.png',
    '/public/profile-back.png',
    '/public/favicon.ico',
    '/public/19ba637387f1d6142f55.ttf',
    '/public/7e687123cd4528224ce5.ttf',
];

// TODO sw
// Install
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         addResourcesToCache([
//             '/',
//             '/index.html',
//             '/styles.css',
//             '/script.js',
//             '/jungle.png',
//         ]),
//     );
// });

// Activate
self.addEventListener('activate', (event) => {
    event.waitUntil(self.registration?.navigationPreload.enable());
});

// Fetch
self.addEventListener('fetch', (event) => {
    console.log('fetch');
    event.respondWith(
        cahceFirst({
            request: event.request,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            preloadResponsePromise: event.preloadResponse,
            fallbackUrl: '/',
        }),
    );
});

// Put data in cache
const putInCache = async (request: Request, response: Response) => {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response);
};

// Try to find data in cache, then
const cahceFirst = async ({
    request,
    preloadResponsePromise,
    fallbackUrl,
}: {
    request: Request;
    preloadResponsePromise: Promise<Response>;
    fallbackUrl: string;
}) => {
    // Try to get response from cache
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache;
    }

    // Try to get preload response
    const preloadResponse = await preloadResponsePromise;
    if (preloadResponse) {
        void putInCache(request, preloadResponse.clone());

        return preloadResponse;
    }

    // Use network
    try {
        const responseFromNetwork = await fetch(request);
        void putInCache(request, responseFromNetwork.clone());

        return responseFromNetwork;
    } catch (error) {
        const fallbackResponse = await caches.match(fallbackUrl);
        if (fallbackResponse) {
            return fallbackResponse;
        }

        return new Response('Network error happened', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' },
        });
    }
};
