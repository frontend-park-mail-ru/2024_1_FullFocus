export type OrderStatus = 'created' | 'cancelled' | 'ready';

export interface IOrder<ProductType> {
    id: number;
    sum: number;
    total: number;
    status: OrderStatus;
    products: ProductType[];
}

export interface IOrderInfo {
    id: number;
    sum: number;
    total: number;
    status: OrderStatus;
}
