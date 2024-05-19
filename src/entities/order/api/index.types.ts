import { OrderStatus } from '../model';

interface IOrderProduct {
    id: number;
    productName: string;
    price: number;
    count: number;
    imgSrc: string;
}

export interface IOrderResponse {
    sum: number;
    itemsCount: number;
    status: OrderStatus;
    createdAt: string;
    products: IOrderProduct[];
}

export interface IOrderInfoResponse {
    id: number;
    sum: number;
    itemsCount: number;
    status: OrderStatus;
    createdAt: string;
}

export interface IOrderCreatedResponse {
    orderID: number;
}
