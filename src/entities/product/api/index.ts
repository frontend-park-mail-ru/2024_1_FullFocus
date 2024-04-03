import { ajaxGet } from '@/shared/api';
import { IProductResponse } from './index.types';
import { PRODUCTS_URL } from './index.constants';

export { IProductResponse } from './index.types';

export async function productsRequest(lastId: number, limit: number) {
    return ajaxGet<Array<IProductResponse>>(PRODUCTS_URL.getProducts, [
        { key: 'lastid', value: lastId.toString() },
        { key: 'limit', value: limit.toString() },
    ]);
}
