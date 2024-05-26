import { Badge, BadgeColor } from '@/shared/uikit/badge';
import { OrderStatus } from '../model';

export function formatStatus(orderStatus: OrderStatus) {
    switch (orderStatus) {
        case 'created':
            return '"Создан"';
        case 'cancelled':
            return '"Отменен"';
        case 'ready':
            return '"Доставлен"';
        default:
            return '"Отменен"';
    }
}

export function formatBadge(
    parent: Element,
    className: string,
    orderStatus: OrderStatus,
) {
    let color: BadgeColor = 'blue';
    let text: string = '';
    switch (orderStatus) {
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

    const STATUS_WIDTH = '92px';

    return new Badge(parent, {
        className: className,
        color: color,
        text: text,
        width: STATUS_WIDTH,
    });
}

export function formatQuantity(totalItems: number) {
    let formatted = `${totalItems}`;
    if (totalItems % 100 > 9 && totalItems % 100 < 20) {
        return formatted + ' товаров';
    }

    const lastDigit = totalItems % 10;
    switch (lastDigit) {
        case 1:
            formatted += ' товар';
            break;
        case 2:
        case 3:
        case 4:
            formatted += ' товара';
            break;
        default:
            formatted += ' товаров';
    }

    return formatted;
}
