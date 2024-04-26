import { ProductCard, productsRequest } from '@/entities/product';
import {
    IProductResponse,
    productsRequestCategory,
    productsRequestSearch,
} from '@/entities/product/api';
import { ProductsSectionItem } from '@/entities/productsSection';

function renderItem(product: IProductResponse, parent: Element) {
    const psi = new ProductsSectionItem<ProductCard>(parent, {
        className: 'product-section-item-' + product.id,
        isInCart: product.inCart ?? false,
    });
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
}

export async function useGetProductCards(page: number, limit: number) {
    return productsRequest(page, limit)
        .then(({ status, data }) => {
            const products: Array<
                (parent: Element) => {
                    card: ProductsSectionItem<ProductCard>;
                    id: number;
                }
            > = [];
            if (status === 200) {
                data.productCards.forEach((product) => {
                    products.push((parent: Element) => {
                        return {
                            card: renderItem(product, parent),
                            id: product.id,
                        };
                    });
                });
            }
            return products;
        })
        .catch(() => {
            const products: Array<
                (parent: Element) => {
                    card: ProductsSectionItem<ProductCard>;
                    id: number;
                }
            > = [];
            return products;
        });
}

export async function useGetProductCardsCategory(categoryId: number) {
    return productsRequestCategory(categoryId)
        .then(({ status, data }) => {
            if (status === 200) {
                const products: Array<
                    (parent: Element) => {
                        card: ProductsSectionItem<ProductCard>;
                        id: number;
                    }
                > = [];
                data.forEach((product) => {
                    products.push((parent: Element) => {
                        return {
                            card: renderItem(product, parent),
                            id: product.id,
                        };
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

export async function useGetProductCardsSearch(
    query: string,
    page: number,
    limit: number,
) {
    return productsRequestSearch(query, page, limit)
        .then(({ status, data }) => {
            if (status === 200) {
                const products: Array<
                    (parent: Element) => {
                        card: ProductsSectionItem<ProductCard>;
                        id: number;
                    }
                > = [];
                data.productCards.forEach((product) => {
                    products.push((parent: Element) => {
                        return {
                            card: renderItem(product, parent),
                            id: product.id,
                        };
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
