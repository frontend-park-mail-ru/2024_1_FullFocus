import { CartItem } from '@/entities/cart';
import { cartRequest } from '@/entities/cart/api';
import {
    BenefitType,
    ProductCard,
    getSaleByBenefitType,
} from '@/entities/product';

export async function useGetUserCart() {
    // Array with functions creating new CartItems
    const cartItems: Array<
        (parent: Element) => { card: CartItem<ProductCard>; id: number }
    > = [];
    const cartResponse = await cartRequest<BenefitType>();
    if (cartResponse.status === 200) {
        const { products, totalCost, totalCount } = cartResponse.data;
        // Iterating through products in the cart
        products.forEach((product) => {
            cartItems.push((parent: Element) => {
                const item = new CartItem<ProductCard>(parent, {
                    className: 'cart-item-' + product.productId.toString(),
                });

                item.insertProduct((parent: Element) => {
                    return {
                        id: product.productId,
                        count: product.count,
                        card: new ProductCard(parent, {
                            className: 'product-' + product.productId,
                            id: product.productId,
                            name: product.name,
                            price: product.newPrice,
                            oldPrice: product.oldPrice,
                            src: product.imgsrc,
                            style: 'horizontal',
                            sale: getSaleByBenefitType(
                                product.oldPrice,
                                product.benefitType,
                                product.benefitValue,
                            ),
                        }),
                    };
                });

                return { card: item, id: product.productId };
            });
        });

        return { cartItems: cartItems, cost: totalCost, total: totalCount };
    }

    return { cartItems: cartItems, cost: 0, total: 0 };
}
