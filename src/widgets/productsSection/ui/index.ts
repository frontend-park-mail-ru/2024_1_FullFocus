import './style.scss';
import productsSectionTmpl from './template.pug';
import { ProductsSectionProps } from './types';
import { ProductCard, productsRequest } from '@/entities/product';
import { Component } from '@/shared/@types/component';

export class ProductsSection extends Component<
    HTMLDivElement,
    ProductsSectionProps
> {
    /**
     * Constructor for ProductsSection
     * @param {Element} parent - parent html element
     */
    constructor(parent: Element, props: ProductsSectionProps) {
        super(parent, productsSectionTmpl, props);
        this.htmlElement = null;
    }

    /**
     * Renders products section
     */
    render() {
        super.render();

        const section = this.htmlElement.getElementsByClassName(
            'products-section__inner',
        )[0];

        productsRequest(1, 10)
            .then((products) => {
                products.forEach((product) => {
                    new ProductCard(section, product).render();
                });
            })
            .catch(() => {});
    }
}
