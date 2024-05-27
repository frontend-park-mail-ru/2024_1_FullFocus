import { NOTIFICATION_URL } from './index.constants';
import { BACKEND_WS_URL } from '@/shared/api/config/index.constants';

export type { NotificationMessage } from './index.types';

export type CentrifugoMessage = {
    method: string;
    params: {
        data: {
            [name: string]: string;
        };
    };
};

function createNotificationWS(url: string) {
    let ws: WebSocket | undefined;

    const create = () => {
        ws = new WebSocket(BACKEND_WS_URL + url);
    };

    return () => {
        if (!ws) {
            create();
        }

        const callbacks = new Map<
            string,
            (message: { [name: string]: string }) => void
        >();

        ws.onopen = () => {
            console.log(ws);
            ws.send(JSON.stringify({ connect: { name: 'js' }, id: 1 }));
        };

        ws.onmessage = (event: MessageEvent<string>) => {
            const message = JSON.parse(event.data) as CentrifugoMessage;

            if (message.method === 'ping') {
                ws.send(JSON.stringify({ method: 'pong', params: {} }));
                return;
            }

            callbacks.forEach((callback) => {
                console.log(callback);
                callback(message.params.data);
            });
        };

        return {
            close: () => {
                ws?.close();
            },

            addCallback: (
                name: string,
                callback: (message: { [name: string]: string }) => void,
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
