import { ajaxGet } from '@/shared/api';
import { PRODUCTS_SECTIONAPI_URLS } from './index.constants';
import { ICategoryResponse } from './index.types';

export async function getCategories() {
    return ajaxGet<ICategoryResponse[]>(
        PRODUCTS_SECTIONAPI_URLS.getCategories,
        [],
    );
}
