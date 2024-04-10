import { ajaxGet } from '@/shared/api';
import { IProductResponse } from './index.types';
import { PRODUCTS_API_URL } from './index.constants';

export { IProductResponse } from './index.types';

export async function productsRequest(lastId: number, limit: number) {
    return ajaxGet<Array<IProductResponse>>(PRODUCTS_API_URL.getProducts, [
        { key: 'lastid', value: lastId.toString() },
        { key: 'limit', value: limit.toString() },
    ]);
}

// TODO move to productssection?
export async function productsRequestCategory(categoryId: number) {
    return ajaxGet<IProductResponse[]>(
        PRODUCTS_API_URL.getProductsCategory + categoryId.toString(),
        [],
    );
}
