import './index.style.scss';
import orderCardTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { OrderCardProps } from './index.types';
import { Badge } from '@/shared/uikit/badge';
import { Link } from '@/shared/uikit/link';
import { formatBadge } from '../../lib';
import { formatDate } from '@/shared/lib/date';

export class OrderCard extends Component<HTMLDivElement, OrderCardProps> {
    protected statusBadge: Badge;
    protected orderLink: Link;

    constructor(parent: Element, props: OrderCardProps) {
        super(parent, orderCardTmpl, props);
    }

    protected render() {
        this.props.orderData = formatDate(this.props.orderData);

        this.renderTemplate();

        this.orderLink = new Link(
            this.htmlElement.getElementsByClassName('order-card__info-left')[0],
            {
                className: 'order-card__order-id',
                text: this.props.id.toString(),
                href: this.props.orderHref,
                style: 'primary',
            },
        );
        this.orderLink.htmlElement.classList.add('text_size-small');

        this.statusBadge = formatBadge(
            this.htmlElement.getElementsByClassName(
                'order-card__info-right',
            )[0],
            'order-card__order-status',
            this.props.status,
        );
    }
}
