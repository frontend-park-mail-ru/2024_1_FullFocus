import { useGetProductCards } from '@/features/product/api';
import './style.scss';
import productsSectionTmpl from './template.pug';
import { ProductsSectionProps } from './types';
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
        // this.htmlElement = null;
    }

    /**
     * Renders products section
     */
    protected render() {
        this.renderTemplate();

        const section = this.htmlElement.getElementsByClassName(
            'products-section__inner',
        )[0];

        useGetProductCards(section, 1, 10);
    }
}
