import { Component } from '@/shared/@types/index.component';
import './index.style.scss';
import notificationCardTmpl from './index.template.pug';
import { NotificationCardProps } from './index.types';
import { Link } from '@/shared/uikit/link';
import { formatStatus } from '@/entities/order';
import { closeToastWrapper } from '@/shared/uikit/toast/ui';
import { readNotification } from '@/entities/user/api';

export class NotificationCard extends Component<
    HTMLDivElement,
    NotificationCardProps
> {
    protected link: Link;
    protected headerTextElement: HTMLSpanElement;
    protected statusElement: HTMLSpanElement;

    constructor(parent: Element, props: NotificationCardProps) {
        super(parent, notificationCardTmpl, props);
    }

    setWasRead() {
        this.props.wasRead = true;
        this.htmlElement
            .getElementsByClassName('notification-card__was-read-marker')[0]
            ?.remove();
        this.htmlElement.classList.remove('notification-card_unread');
        readNotification(this.props.id)
            .then(() => {
                this.props.wasRead = true;
                this.htmlElement.dispatchEvent(
                    new Event('notificationread', {
                        bubbles: true,
                    }),
                );
            })
            .catch(() => {});
    }

    protected componentDidMount() {
        if (this.props.style === 'full' && !this.props.wasRead) {
            this.htmlElement.addEventListener('mouseenter', () => {
                if (!this.props.wasRead) {
                    this.setWasRead();
                }
            });
        }
    }

    protected render() {
        this.props.style = this.props.style ?? 'info';
        this.props.wasRead = this.props.wasRead ?? true;

        this.renderTemplate();

        this.statusElement = this.htmlElement.getElementsByClassName(
            'notification-card__status',
        )[0] as HTMLSpanElement;
        this.statusElement.innerText = formatStatus(this.props.status);

        this.link = closeToastWrapper(
            new Link(
                this.htmlElement.getElementsByClassName(
                    'notification-card__link-container',
                )[0],
                {
                    className: 'notification-card__link',
                    text: this.props.orderID,
                    style: 'primary',
                    href: 'profile/order/' + this.props.orderID,
                },
            ),
        );

        if (this.props.style === 'full' && this.props.id) {
            this.htmlElement.dataset['id'] = this.props.id;
        }

        this.componentDidMount();
    }
}
