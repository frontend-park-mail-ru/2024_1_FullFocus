import { ProductCard, productsRequest } from '@/entities/product';

export function useGetProductCards(
    parent: Element,
    lastId: number,
    limit: number,
) {
    productsRequest(lastId, limit)
        .then(({ Status, Data }) => {
            if (Status === 200) {
                const products: Array<ProductCard> = [];
                Data.forEach((product) => {
                    products.push(
                        new ProductCard(parent, {
                            id: product['id'],
                            name: product['name'],
                            price: product['price'],
                            imgLink: product['img-link'],
                            category: product['category'],
                            description: product['description'],
                        }),
                    );
                });
                return products;
            }
            return [];
        })
        .catch(() => {
            return [];
        });
}
