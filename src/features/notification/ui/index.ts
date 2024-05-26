import { NotificationMessage, getWS } from './../api';
import { NOTIFICATION_CALLBACK_NAME } from './index.constants';
import { NotificationCard } from './notificationCard/ui';
import { OrderStatus } from '@/entities/order/model';
import { toast } from '@/shared/uikit/toast';

const productStatusChanged = (message: MessageEvent<string>) => {
    const data = JSON.parse(message.data) as NotificationMessage;
    toast().addMessageCustom('Статус заказа изменен', (parent: Element) => {
        return new NotificationCard(parent, {
            className: 'toast__notification-card',
            id: data.data.id.toString(),
            status: data.data.status as OrderStatus,
        });
    });
};

export const getNotificationCards = () => {
    const ws = getWS();
    ws.addCallback(NOTIFICATION_CALLBACK_NAME, productStatusChanged);
    return {
        close: () => {
            ws.removeCallback(NOTIFICATION_CALLBACK_NAME);
            ws.close();
        },
    };
};
