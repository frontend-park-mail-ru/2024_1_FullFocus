import { OrderStatus } from '@/entities/order/model';

export interface NotificationCardProps {
    className: string;
    id: string;
    status: OrderStatus;
}
