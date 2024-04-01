import { ajaxGet } from '@/shared/api';
import { IProductResponse } from './types';
import { PRODUCTS_URL } from './constants';
import { IProduct } from '../model';

export { IProductResponse } from './types';

export async function productsRequest(lastId: number, limit: number) {
    return ajaxGet<Array<IProductResponse>>(PRODUCTS_URL.getProducts, [
        { key: 'lastid', value: lastId.toString() },
        { key: 'limit', value: limit.toString() },
    ])
        .then(({ Status, Data }) => {
            if (Status === 200) {
                const products: Array<IProduct> = [];
                Data.forEach((product) => {
                    products.push({
                        id: product['id'],
                        name: product['name'],
                        price: product['price'],
                        imgLink: product['img-link'],
                        category: product['category'],
                        description: product['description'],
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
