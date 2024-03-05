import productsSectionTmpl from './productsSection.pug'
import { domFromHtml } from '../../shared/lib/domFromHtml/domFromHtml';
import { ajax } from '../../shared/api/ajax';
import { ProductCard } from './productCard/productCard';

export class ProductsSection {
    constructor() {

    }

    render() {
        const component = domFromHtml(productsSectionTmpl());

        ajax('GET', '/api/products/', {'lastid': 1, 'limit': 10}, null, (data, status) => {
            if (status === 200) {
                const products = data;
                if (products && Array.isArray(products)) {
                    products.forEach((product) => {
                        const productCardObj = new ProductCard(this, product['name'], product['price'], product['img-link']);
                        component.appendChild(productCardObj.render());
                    })
                }
            }
        });

        return component;
    }
}