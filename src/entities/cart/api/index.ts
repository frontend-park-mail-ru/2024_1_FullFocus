import { ajaxGet, ajaxPost } from '@/shared/api';
import { CART_API_URLS } from './index.constants';
import { ICartData } from './index.types';

export async function cartRequest<BenefitType>() {
    return ajaxGet<ICartData<BenefitType>>(CART_API_URLS.getCart, []);
}

export async function addToCart(productId: number) {
    return ajaxPost<{ count: number }>(CART_API_URLS.addToCart, [], {
        productId: productId,
    });
}

export async function deleteFromCart(productId: number) {
    return ajaxPost<{ count: number }>(CART_API_URLS.deleteFromCart, [], {
        productId: productId,
    });
}

export async function clearCart() {
    return ajaxPost<null>(CART_API_URLS.clearCart, [], null);
}
