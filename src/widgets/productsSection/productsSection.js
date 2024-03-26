import './style.css';
import productsSectionTmpl from './productsSection.pug';
import { ajax } from '../../shared/api/ajax';
import { ProductCard } from './productCard/productCard';

export class ProductsSection {
    /**
     * Constructor for ProductsSection
     * @param {HTMLElement} parent - parent html element
     * @param {string} header - products section header
     */
    constructor(parent, header = '') {
        this.parent = parent;
        this.header = header;
        this.htmlElement = null;
    }

    /**
     * Renders products section
     * @returns {HTMLElement} rendered products section
     */
    render() {
        this.parent.insertAdjacentHTML(
            'beforeend',
            productsSectionTmpl({ header: this.header }),
        );

        this.htmlElement =
            this.parent.getElementsByClassName('products-section')[0];

        const section = this.htmlElement.getElementsByClassName(
            'products-section__inner',
        )[0];

        ajax(
            'GET',
            '/api/products/',
            { lastid: 1, limit: 10 },
            null,
            (data, status) => {
                if (status === 200) {
                    const products = data;
                    if (products && Array.isArray(products)) {
                        products.forEach((product) => {
                            new ProductCard(
                                section,
                                product['name'],
                                product['price'],
                                product['img-link'],
                            ).render();
                        });
                    }
                }
            },
        );
    }
}
