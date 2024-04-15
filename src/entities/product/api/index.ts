import { ajaxGet } from '@/shared/api';
import { IProductResponse } from './index.types';
import { PRODUCTS_API_URL } from './index.constants';

export type { IProductResponse } from './index.types';

export async function productsRequest(page: number, limit: number) {
    return ajaxGet<{ productCards: Array<IProductResponse> }>(
        PRODUCTS_API_URL.getProducts,
        [
            { key: 'page', value: page.toString() },
            { key: 'limit', value: limit.toString() },
        ],
    );
}

// TODO move to productssection?
export async function productsRequestCategory(categoryId: number) {
    return ajaxGet<IProductResponse[]>(
        PRODUCTS_API_URL.getProductsCategory + categoryId.toString(),
        [
            { key: 'page', value: '1' },
            { key: 'limit', value: '10' },
        ],
    );
}
