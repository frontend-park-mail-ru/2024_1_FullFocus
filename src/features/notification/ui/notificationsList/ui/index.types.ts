import { NotificationCard } from '../../notificationCard/ui';

export type NotificationsListProps = {
    className: string;
    wrap: boolean;
    emptyText?: string;
    notificationsByDate?: Map<
        string,
        ((parent: Element) => { item: NotificationCard; id: string })[]
    >;
    unreadIdsByDate?: Map<string, string[]>;
};
