import { Component } from '@/shared/@types/index.component';
import './index.style.scss';
import notificationCardTmpl from './index.template.pug';
import { NotificationCardProps } from './index.types';
import { Link } from '@/shared/uikit/link';
import { formatStatus } from '@/entities/order';
import { closeToastWrapper } from '@/shared/uikit/toast/ui';

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
                    text: this.props.id.toString(),
                    style: 'primary',
                    href: 'profile/order/' + this.props.id,
                },
            ),
        );
    }
}
