import { NotificationCard } from '@/features/notification/ui/notificationCard/ui';

export type NotificationsSectionProps = {
    className: string;
    date: string;
    items: ((parent: Element) => { item: NotificationCard; id: string })[];
};
