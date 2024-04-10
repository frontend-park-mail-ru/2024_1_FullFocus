import { ProductCard, productsRequest } from '@/entities/product';
import { productsRequestCategory } from '@/entities/product/api';
import { ProductCardType } from '@/entities/product/ui/index.types';
import { ProductsSectionItem } from '@/entities/productsSection';

export async function useGetProductCards(page: number, limit: number) {
    return productsRequest(page, limit)
        .then(({ status, data }) => {
            const products: Array<
                (parent: Element) => ProductsSectionItem<ProductCard>
            > = [];
            if (status === 200) {
                data.productCards.forEach((product) => {
                    products.push((parent: Element) => {
                        const psi = new ProductsSectionItem<ProductCard>(
                            parent,
                            {
                                className: 'product-section-item-' + product.id,
                                isInCart: false,
                            },
                        );
                        psi.insertProductCard((parent: Element) => {
                            const productCard = new ProductCard(parent, {
                                className: 'product-' + product.id,
                                id: product.id,
                                name: product['name'],
                                price: product['price'],
                                src: product['imgSrc'],
                                style: 'vertical',
                            });
                            return { product: productCard, id: productCard.id };
                        });
                        return psi;
                    });
                });
            }
            return products;
        })
        .catch(() => {
            const products: Array<
                (
                    parent: Element,
                    productCardType: ProductCardType,
                ) => ProductCard
            > = [];
            return products;
        });
}

export async function useGetProductCardsCategory(categoryId: number) {
    return productsRequestCategory(categoryId)
        .then(({ status, data }) => {
            if (status === 200) {
                const products: Array<
                    (parent: Element) => ProductsSectionItem<ProductCard>
                > = [];
                data.forEach((product) => {
                    products.push((parent: Element) => {
                        const psi = new ProductsSectionItem<ProductCard>(
                            parent,
                            {
                                className: 'product-section-item-' + product.id,
                                isInCart: false,
                            },
                        );
                        psi.insertProductCard((parent: Element) => {
                            const productCard = new ProductCard(parent, {
                                className: 'product-' + product.id,
                                id: product.id,
                                name: product['name'],
                                price: product['price'],
                                src: product['imgSrc'],
                                style: 'vertical',
                            });
                            return { product: productCard, id: productCard.id };
                        });
                        return psi;
                    });
                });
                return products;
            }
            return [];
        })
        .catch(() => {
            return [];
        });
}
