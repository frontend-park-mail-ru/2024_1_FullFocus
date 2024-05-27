import { getAllNotifications } from '@/entities/user/api';
import { getWS } from './../api';
import { NOTIFICATION_CALLBACK_NAME } from './index.constants';
import { NotificationCard } from './notificationCard/ui';
import { OrderStatus } from '@/entities/order/model';
import { toast } from '@/shared/uikit/toast';
import { formatFullDate } from '@/shared/lib/date';
import { NotificationsList } from './notificationsList';

export { NotificationCard } from './notificationCard/ui';

const productStatusChanged = (message: { [name: string]: string }) => {
    toast().addMessageCustom('Статус заказа изменен', (parent: Element) => {
        return new NotificationCard(parent, {
            className: 'toast__notification-card',
            orderID: message.id,
            status: message.newStatus as OrderStatus,
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

export async function useGetNotificationsList() {
    return getAllNotifications()
        .then(({ status, data }) => {
            if (status === 200) {
                const notificationsByDate = new Map<
                    string,
                    ((parent: Element) => {
                        item: NotificationCard;
                        id: string;
                    })[]
                >();
                const unreadIdsByDate = new Map<string, string[]>();

                data.forEach((notification) => {
                    const { time, date } = formatFullDate(
                        notification.createdAt,
                    );
                    if (!notificationsByDate.has(date)) {
                        notificationsByDate.set(date, []);
                    }
                    if (!notification.readStatus) {
                        if (!unreadIdsByDate.has(date)) {
                            unreadIdsByDate.set(date, []);
                        }
                        unreadIdsByDate
                            .get(date)
                            .push(notification.id.toString());
                    }

                    const payload = JSON.parse(notification.payload) as {
                        data: {
                            orderID: number;
                            oldStatus: string;
                            newStatus: string;
                        };
                    };
                    notificationsByDate.get(date).push((parent: Element) => {
                        return {
                            item: new NotificationCard(parent, {
                                className: `notification-card-[${notification.id}]`,
                                status: payload.data.newStatus as OrderStatus,
                                id: notification.id.toString(),
                                orderID: payload.data.orderID.toString(),
                                style: 'full',
                                time: time,
                                wasRead: notification.readStatus,
                            }),
                            id: notification.id.toString(),
                        };
                    });
                });

                return (parent: Element, className: string) => {
                    return new NotificationsList(parent, {
                        className: className,
                        notificationsByDate: notificationsByDate,
                        unreadIdsByDate: unreadIdsByDate,
                        wrap: false,
                    });
                };
            }

            return (parent: Element, className: string) => {
                return new NotificationsList(parent, {
                    className: className,
                    wrap: false,
                });
            };
        })
        .catch(() => {
            return (parent: Element, className: string) => {
                return new NotificationsList(parent, {
                    className: className,
                    wrap: false,
                });
            };
        });
}
