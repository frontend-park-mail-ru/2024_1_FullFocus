import { List } from '@/shared/uikit/list';
import { NotificationsListProps } from './index.types';
import { NotificationsSection } from './notificationsSection/ui';

export class NotificationsList extends List<NotificationsSection> {
    protected props: NotificationsListProps;
    protected totalUnread: number;

    constructor(parent: Element, props: NotificationsListProps) {
        super(parent, props);
        this.renderSections();
    }

    readAll() {
        if (this.areUnread) {
            this.props.unreadIdsByDate.forEach((ids, date) => {
                ids.forEach((id) => {
                    this.itemById(date).read(id);
                });
            });
            this.props.unreadIdsByDate.clear();
            this.props.unreadIdsByDate = null;
        }
    }

    get areUnread() {
        return this.totalUnread > 0;
    }

    protected componentDidMount() {
        this.htmlElement.addEventListener('notificationread', () => {
            this.totalUnread--;
        });
    }

    protected render(): void {
        this.props.emptyText =
            this.props.emptyText ?? 'Здесь пока что ничего нет!';
        this.props.wrap = false;
        this.renderTemplate();
    }

    protected renderSections() {
        if (this.props.notificationsByDate) {
            this.props.notificationsByDate.forEach((cards, date) => {
                this.pushItem((parent: Element) => {
                    return {
                        id: date,
                        item: new NotificationsSection(parent, {
                            className: `notifications-section-[${date}]`,
                            items: cards,
                            date: date,
                        }),
                    };
                });
            });

            if (this.props.notificationsByDate.size === 0) {
                this.setEmptyText();
            }

            this.totalUnread = this.props.unreadIdsByDate
                ? this.props.unreadIdsByDate.size
                : 0;

            this.componentDidMount();
        }

        if (!this.props.notificationsByDate) {
            this.setEmptyText();
        }
    }
}
