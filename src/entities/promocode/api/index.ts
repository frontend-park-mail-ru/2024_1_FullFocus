import { ajaxGet } from '@/shared/api';
import { PROMOCODE_API_URLS } from './index.constants';
import {
    Promocode,
    PromocodeActivationInfo,
    PromocodeById,
} from './index.types';

export type { BenefitType } from './index.types';

/**
 * id - unique type of promocode
 * code - promocode with a certain type given to a user
 */

export function promocodeById(id: number) {
    return ajaxGet<PromocodeById>(
        PROMOCODE_API_URLS.promocodeById + id.toString(),
        [],
    );
}

export function promocodeActivationInfo(code: string) {
    return ajaxGet<PromocodeActivationInfo>(
        PROMOCODE_API_URLS.promocodeActivationInfo + code,
        [],
    );
}

export function promocodesAll() {
    return ajaxGet<Promocode[]>(PROMOCODE_API_URLS.allPromocodes, []);
}
