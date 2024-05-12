import './index.style.scss';
import orderCardTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { OrderCardProps } from './index.types';
import { Badge, BadgeColor } from '@/shared/uikit/badge';

export class OrderCard extends Component<HTMLDivElement, OrderCardProps> {
    protected statusBadge: Badge;

    constructor(parent: Element, props: OrderCardProps) {
        super(parent, orderCardTmpl, props);
    }

    protected render() {
        this.renderTemplate();

        const STATUS_WIDTH = '92px';

        let color: BadgeColor = 'blue';
        let text: string = '';
        switch (this.props.status) {
            case 'created':
                color = 'blue';
                text = 'Создан';
                break;
            case 'cancelled':
                color = 'red';
                text = 'Отменен';
                break;
            case 'ready':
                color = 'green';
                text = 'Доставлен';
        }

        this.statusBadge = new Badge(
            this.htmlElement.getElementsByClassName(
                'order-card__info-right',
            )[0],
            {
                className: 'order-card__order-status',
                color: color,
                text: text,
                width: STATUS_WIDTH,
            },
        );
    }
}
