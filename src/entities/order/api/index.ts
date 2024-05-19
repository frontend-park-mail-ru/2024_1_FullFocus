import {
    IOrderResponse,
    IOrderInfoResponse,
    IOrderCreatedResponse,
} from './index.types';
import { ajaxGet, ajaxPost } from '@/shared/api';
import { ORDER_API_URLS } from './index.constants';

export async function allOrdersRequest() {
    return ajaxGet<IOrderInfoResponse[]>(ORDER_API_URLS.getAll, []);
}

export async function orderRequest(id: number) {
    return ajaxGet<IOrderResponse>(ORDER_API_URLS.getById + id.toString(), []);
}

export async function createOrderRequest(
    items: { productId: number; count: number }[],
) {
    return ajaxPost<IOrderCreatedResponse>(ORDER_API_URLS.create, [], {
        items: items,
        fromCart: true,
    });
}
