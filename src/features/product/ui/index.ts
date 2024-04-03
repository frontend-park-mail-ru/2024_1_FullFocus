import { ProductCard, productsRequest } from '@/entities/product';

export async function useGetProductCards(
    parent: Element,
    lastId: number,
    limit: number,
) {
    return productsRequest(lastId, limit)
        .then(({ status, data }) => {
            if (status === 200) {
                const products: Array<ProductCard> = [];
                data.forEach((product) => {
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
