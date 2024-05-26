import { OrderStatus } from '@/entities/order/model';

export interface NotificationCardProps {
    className: string;
    id?: string;
    orderID: string;
    status: OrderStatus;
    style?: 'full' | 'info';
    wasRead?: boolean;
    time?: string;
}
