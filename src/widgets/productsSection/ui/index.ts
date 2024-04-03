import { useGetProductCards } from '@/features/product';
import './index.style.scss';
import productsSectionTmpl from './index.template.pug';
import { ProductsSectionProps } from './index.types';
import { Component } from '@/shared/@types/index.component';
import { ProductCard } from '@/entities/product';

export class ProductsSection extends Component<
    HTMLDivElement,
    ProductsSectionProps
> {
    protected products: Array<ProductCard>;

    /**
     * Constructor for ProductsSection
     * @param {Element} parent - parent html element
     */
    constructor(parent: Element, props: ProductsSectionProps) {
        super(parent, productsSectionTmpl, props);
        this.products = [];
    }

    /**
     * Renders products section
     */
    protected render() {
        this.renderTemplate();

        const section = this.htmlElement.getElementsByClassName(
            'products-section__inner',
        )[0];

        useGetProductCards(section, 1, 10)
            .then((products) => {
                this.products = products;
            })
            .catch(() => {
                this.products = [];
            });
    }

    destroy(): void {
        this.products.forEach((product) => {
            product.destroy();
        });
        this.htmlElement.remove();
    }
}
