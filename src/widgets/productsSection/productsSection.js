import './style.css';
import productsSectionTmpl from './productsSection.pug'
import { domFromHtml } from '../../shared/lib/domFromHtml/domFromHtml';
import { ajax } from '../../shared/api/ajax';
import { ProductCard } from './productCard/productCard';

export class ProductsSection {
    /**
     * Constructor for ProductsSection
     * @param {string} header - products section header
     */
    constructor(header = '') {
        this.header = header;
    }

    /**
     * Renders products section
     * @returns {HTMLElement} rendered products section
     */
    render() {
        const component = domFromHtml(productsSectionTmpl({header: this.header}));
        const section = component.getElementsByClassName('products-section__inner')[0];

        ajax('GET', '/api/products/', {'lastid': 1, 'limit': 10}, null, (data, status) => {
            if (status === 200) {
                const products = data;
                if (products && Array.isArray(products)) {
                    products.forEach((product) => {
                        const productCardObj = new ProductCard(this, product['name'], product['price'], product['img-link']);
                        section.appendChild(productCardObj.render());
                    })
                }
            }
        });

        return component;
    }
}