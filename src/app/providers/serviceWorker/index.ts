export function registerSW() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/public/sw.js', {
                    scope: '/',
                })
                .then((registration) => {
                    if (registration.installing) {
                        let a = performance.getEntriesByType('resource');
                        a = a.filter((r) => {
                            return !r.name.endsWith(
                                '/api/auth/public/v1/check',
                            );
                        });
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
