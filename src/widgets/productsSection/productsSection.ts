import './style.scss';
import productsSectionTmpl from './productsSection.pug';
import { ajax } from '@/shared/api/ajax';
import { ProductCard } from './productCard/productCard';

interface ProductResponse {
    id: number;
    name: string;
    price: number;
    category: string;
    'img-link': string;
    description: string;
}

export class ProductsSection {
    parent: Element;
    header: string;
    htmlElement: HTMLDivElement;

    /**
     * Constructor for ProductsSection
     * @param {Element} parent - parent html element
     * @param {string} header - products section header
     */
    constructor(parent: Element, header: string = '') {
        this.parent = parent;
        this.header = header;
        this.htmlElement = null;
    }

    /**
     * Renders products section
     */
    render() {
        this.parent.insertAdjacentHTML(
            'beforeend',
            productsSectionTmpl({ header: this.header }),
        );

        this.htmlElement = this.parent.getElementsByClassName(
            'products-section',
        )[0] as HTMLDivElement;

        const section = this.htmlElement.getElementsByClassName(
            'products-section__inner',
        )[0];

        const p = ajax<Array<ProductResponse>>(
            'GET',
            '/api/products/',
            [
                { key: 'lastid', value: '1' },
                { key: 'limit', value: '10' },
            ],
            null,
        );

        p.then(({ Status, Data }) => {
            if (Status === 200) {
                const products = Data;
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
        }).catch((error) => {
            console.log(error);
        });
    }
}
