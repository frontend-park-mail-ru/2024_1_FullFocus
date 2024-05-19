import { ajaxGet } from '@/shared/api';
import {
    IProductResponse,
    ProductByCategoriesResponse,
    ProductsBySearchResponse,
    Suggestions,
} from './index.types';
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

export async function productByIdRequest(id: string) {
    return ajaxGet<IProductResponse>(PRODUCTS_API_URL.getProductById + id, []);
}

// TODO move to productssection?

// TODO page limit from function args
export async function productsRequestCategory(
    categoryId: number,
    sortId: string,
) {
    const queryParams = [
        { key: 'page', value: '1' },
        { key: 'limit', value: '12' },
    ];

    if (sortId) {
        queryParams.push({ key: 'sortID', value: sortId });
    }

    return ajaxGet<ProductByCategoriesResponse>(
        PRODUCTS_API_URL.getProductsCategory + categoryId.toString(),
        queryParams,
    );
}

export async function productsRequestSearch(
    query: string,
    page: number,
    limit: number,
    sortId?: string,
) {
    const queryParams = [
        { key: 'query', value: query },
        { key: 'page', value: page.toString() },
        { key: 'limit', value: limit.toString() },
    ];

    if (sortId) {
        queryParams.push({ key: 'sortID', value: sortId });
    }

    return ajaxGet<ProductsBySearchResponse>(
        PRODUCTS_API_URL.getProductsBySearch,
        queryParams,
    );
}

export async function suggestionRequest(query: string) {
    return ajaxGet<Suggestions>(PRODUCTS_API_URL.getSuggestions, [
        { key: 'query', value: query },
    ]);
}
