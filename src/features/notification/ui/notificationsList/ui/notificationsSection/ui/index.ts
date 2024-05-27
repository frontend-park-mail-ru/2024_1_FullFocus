import './index.style.scss';
import notificationsSectionTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { NotificationsSectionProps } from './index.types';
import { Separator } from '@/shared/uikit/separator/ui';
import { List } from '@/shared/uikit/list';
import { NotificationCard } from '@/features/notification/ui/notificationCard/ui';

export class NotificationsSection extends Component<
    HTMLDivElement,
    NotificationsSectionProps
> {
    protected separator: Separator;
    protected notificationsList: List<NotificationCard>;

    constructor(parent: Element, props: NotificationsSectionProps) {
        super(parent, notificationsSectionTmpl, props);
    }

    read(id: string) {
        this.notificationsList.itemById(id).setWasRead();
    }

    protected render() {
        if (this.props.items.length > 0) {
            this.renderTemplate();
            this.separator = new Separator(this.htmlElement, {
                className: 'notification-section__date',
                text: this.props.date,
            });

            this.notificationsList = new List(this.htmlElement, {
                className: 'notifications-section__notifications',
                wrap: false,
                gap: '8px',
            });

            this.props.items.forEach((item) => {
                this.notificationsList.pushItem(item);
            });
        }
    }
}
