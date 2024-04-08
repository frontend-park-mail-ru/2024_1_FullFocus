import { OrderStatus } from '../../model';

export interface OrderCardProps {
    className: string;
    id: number;
    sum: number;
    total: number;
    status: OrderStatus;
    orderHref: string;
}
