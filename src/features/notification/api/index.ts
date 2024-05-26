import { NOTIFICATION_URL } from './index.constants';
import { BACKEND_WS_URL } from '@/shared/api/config/index.constants';

export type { NotificationMessage } from './index.types';

function createNotificationWS(url: string) {
    let ws: WebSocket | undefined;

    const create = () => {
        ws = new WebSocket(BACKEND_WS_URL + url);
    };

    return () => {
        if (!ws) {
            create();
        }

        const callbacks = new Map<string, (message: MessageEvent) => void>();

        ws.onopen = () => {
            console.log(ws);
        };

        ws.onmessage = (message) => {
            callbacks.forEach((callback) => {
                console.log(callback);
                callback(message);
            });
        };

        return {
            close: () => {
                ws?.close();
            },

            addCallback: (
                name: string,
                callback: (message: MessageEvent) => void,
            ) => {
                callbacks.set(name, callback);
            },

            removeCallback: (name: string) => {
                callbacks.delete(name);
            },
        };
    };
}

export const getWS = createNotificationWS(NOTIFICATION_URL);
