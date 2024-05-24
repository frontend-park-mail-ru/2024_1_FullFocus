import { useGetProductCardsRecommendation } from '@/features/product';
import './index.style.scss';
import productsSectionRecommendationTmpl from './index.template.pug';
import { ProductsSectionRecommendationProps } from './index.types';
import { Component } from '@/shared/@types/index.component';
import { ProductCard } from '@/entities/product';
import { ProductsList } from '@/entities/productsSection/ui/productsList';

export class ProductsSectionRecommendation extends Component<
    HTMLDivElement,
    ProductsSectionRecommendationProps
> {
    protected productsList: ProductsList<ProductCard>;
    protected productsSection: HTMLDivElement;
    protected listener: (e: Event) => void;

    constructor(parent: Element, props: ProductsSectionRecommendationProps) {
        super(parent, productsSectionRecommendationTmpl, props);
    }

    protected render() {
        this.renderTemplate();

        this.productsList = new ProductsList<ProductCard>(this.htmlElement, {
            className: 'products-section-recommendation__products-list',
            navigateToCart: this.props.navigateToCart,
        });

        useGetProductCardsRecommendation()
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
