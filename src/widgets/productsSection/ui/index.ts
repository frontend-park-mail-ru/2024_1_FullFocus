import { useGetProductCards } from '@/features/product';
import './index.style.scss';
import productsSectionTmpl from './index.template.pug';
import { ProductsSectionProps } from './index.types';
import { Component } from '@/shared/@types/index.component';
import { ProductCard } from '@/entities/product';
import { ProductsList } from '@/entities/productsSection/ui/productsList';

export class ProductsSection extends Component<
    HTMLDivElement,
    ProductsSectionProps
> {
    protected productsList: ProductsList<ProductCard>;
    protected productsSection: HTMLDivElement;
    protected listener: (e: Event) => void;

    /**
     * Constructor for ProductsSection
     * @param {Element} parent - parent html element
     */
    constructor(parent: Element, props: ProductsSectionProps) {
        super(parent, productsSectionTmpl, props);
    }

    /**
     * Renders products section
     */
    protected render() {
        this.renderTemplate();

        this.productsList = new ProductsList<ProductCard>(this.htmlElement, {
            className: 'products-section__products-list',
            navigateToCart: this.props.navigateToCart,
        });

        useGetProductCards(1, 12)
            .then((products) => {
                this.productsList.loadProducts(products);
            })
            .catch(() => {
                this.productsList.clear();
                this.productsSection.innerText = 'что-то пошло не так';
            });
    }

    destroy(): void {
        this.productsList.destroy();
        this.htmlElement.remove();
    }
}
