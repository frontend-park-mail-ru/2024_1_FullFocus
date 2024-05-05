import { ajaxGet } from '@/shared/api';
import { ISort } from './index.types';
import { SORTING_API_URL } from './index.constants';


export async function sortRequest() {
    return ajaxGet<{ sort: Array<ISort> }>(
        SORTING_API_URL.getSorting,
        [],
    );
}