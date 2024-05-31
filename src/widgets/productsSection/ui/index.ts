import { useGetProductCards } from '@/features/product';
import './index.style.scss';
import productsSectionTmpl from './index.template.pug';
import { ProductsSectionProps } from './index.types';
import { Component } from '@/shared/@types/index.component';
import { ProductCard } from '@/entities/product';
import { ProductsList } from '@/entities/productsSection/ui/productsList';
import { animateLongRequest } from '@/shared/api/ajax/throttling';

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

        animateLongRequest(
            () => {
                return useGetProductCards(1, 12);
            },
            (products) => {
                this.productsList.loadProducts(products);
            },
            () => {
                this.productsList.clear();
                this.productsSection.innerText = 'что-то пошло не так';
            },
            () => {
                this.productsList.setLoading();
            },
            () => {
                this.productsList.removeLoading();
            },
            150,
            1000,
        )();
    }

    destroy(): void {
        this.productsList.destroy();
        this.htmlElement.remove();
    }
}
