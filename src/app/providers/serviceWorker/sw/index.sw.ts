/// <reference lib="WebWorker" />

// export empty type because of tsc --isolatedModules flag
export type {};
declare const self: ServiceWorkerGlobalScope;

import noNetworkPage from './index.noNetworkPage.pug';

const CACHE_NAME = 'v1';

// Install
self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', (event) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (event.data.type === 'CACHE_DATA') {
        event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
                return cache.addAll(event.data.payload);
            }),
        );
    }
});

// Activate
self.addEventListener('activate', (event) => {
    event.waitUntil(self.registration?.navigationPreload.enable());
});

// Fetch
self.addEventListener('fetch', (event) => {
    event.respondWith(
        networkFirst({
            request: event.request,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            preloadResponsePromise: event.preloadResponse,
            fallbackUrl: '/',
        }),
    );
});

// Put data in cache
const putInCache = async (request: Request, response: Response) => {
    if (request.method === 'GET') {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response);
    }
};

// Try to find data in cache, then
const networkFirst = async ({
    request,
    fallbackUrl,
}: {
    request: Request;
    fallbackUrl: string;
    preloadResponsePromise?: Promise<Response>;
}) => {
    // Use network
    try {
        const responseFromNetwork = await fetch(request);
        void putInCache(request, responseFromNetwork.clone());

        return responseFromNetwork;
    } catch (error) {
        // Try to get response from cache
        const responseFromCache = await caches.match(request);
        if (responseFromCache) {
            return responseFromCache;
        }

        const fallbackResponse = await caches.match(fallbackUrl);
        if (fallbackResponse) {
            return fallbackResponse;
        }

        return new Response(noNetworkPage(), {
            status: 408,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
    }
};
