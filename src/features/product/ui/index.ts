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
        amount: product.amount ?? 0,
    });
    psi.insertProductCard((parent: Element) => {
        const productCard = new ProductCard(parent, {
            className: 'product-' + product.id,
            id: product.id,
            name: product.name,
            price: product.price,
            src: product.imgSrc,
            style: 'vertical',
            rating: product.rating,
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
                    item: ProductsSectionItem<ProductCard>;
                    id: string;
                }
            > = [];
            if (status === 200) {
                data.productCards.forEach((product) => {
                    products.push((parent: Element) => {
                        return {
                            item: renderItem(product, parent),
                            id: product.id.toString(),
                        };
                    });
                });
            }
            return products;
        })
        .catch(() => {
            const products: Array<
                (parent: Element) => {
                    item: ProductsSectionItem<ProductCard>;
                    id: string;
                }
            > = [];
            return products;
        });
}

export async function useGetProductCardsCategory(
    categoryId: number,
    sortID: string,
) {
    return productsRequestCategory(categoryId, sortID)
        .then(({ status, data }) => {
            if (status === 200) {
                const products: Array<
                    (parent: Element) => {
                        item: ProductsSectionItem<ProductCard>;
                        id: string;
                    }
                > = [];
                data.productCards.forEach((product) => {
                    products.push((parent: Element) => {
                        return {
                            item: renderItem(product, parent),
                            id: product.id.toString(),
                        };
                    });
                });
                return { products: products, category: data.categoryName };
            }
            return { products: [], category: '' };
        })
        .catch(() => {
            return { products: [], category: '' };
        });
}

export async function useGetProductCardsSearch(
    query: string,
    page: number,
    limit: number,
    sortId: string,
) {
    return productsRequestSearch(query, page, limit, sortId)
        .then(({ status, data }) => {
            if (status === 200) {
                const products: Array<
                    (parent: Element) => {
                        item: ProductsSectionItem<ProductCard>;
                        id: string;
                    }
                > = [];
                data.productCards.forEach((product) => {
                    products.push((parent: Element) => {
                        return {
                            item: renderItem(product, parent),
                            id: product.id.toString(),
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
