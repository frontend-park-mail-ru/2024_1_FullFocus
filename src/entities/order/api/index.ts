import { IOrderResponse, IOrderInfoResponse } from './index.types';
import { ajaxGet } from '@/shared/api';
import { ORDER_API_URLS } from './index.constants';

export async function allOrdersRequest() {
    return ajaxGet<IOrderInfoResponse[]>(ORDER_API_URLS.getAll, []);
}

export async function orderRequest(id: number) {
    return ajaxGet<IOrderResponse>(ORDER_API_URLS.getById + id.toString(), []);
}
