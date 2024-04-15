export function registerSW() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/public/sw.js', {
                    scope: '/',
                })
                .then((registration) => {
                    if (registration.installing) {
                        const a = performance.getEntriesByType('resource');
                        const data = {
                            type: 'CACHE_DATA',
                            payload: [location.href, ...a.map((r) => r.name)],
                        };
                        registration.installing.postMessage(data);
                    }
                })
                .catch(() => {});
        });
    }
}
