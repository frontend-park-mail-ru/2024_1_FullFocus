import { useGetProductCards } from '@/features/product';
import './index.style.scss';
import productsSectionTmpl from './index.template.pug';
import { ProductsSectionProps } from './index.types';
import { Component } from '@/shared/@types/index.component';
import { ProductCard } from '@/entities/product';
import { CategoriesList } from './categoriesList';
import { ProductsList } from '@/entities/productsSection/ui/productsList';

export class ProductsSection extends Component<
    HTMLDivElement,
    ProductsSectionProps
> {
    protected productsList: ProductsList<ProductCard>;
    protected productsSection: HTMLDivElement;
    protected categoryName: HTMLSpanElement;
    protected productsCategories: CategoriesList;
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

        this.categoryName = this.htmlElement.getElementsByClassName(
            'products-section__header',
        )[0] as HTMLSpanElement;

        this.productsSection = this.htmlElement.getElementsByClassName(
            'products-section__section',
        )[0] as HTMLDivElement;

        this.productsCategories = new CategoriesList(
            this.htmlElement.getElementsByClassName(
                'products-section__categories',
            )[0],
            {
                className: 'categories',
            },
        );

        this.productsList = new ProductsList<ProductCard>(
            this.productsSection,
            { className: 'products-section__products-list' },
        );

        useGetProductCards(1, 10)
            .then((products) => {
                this.productsList.loadProducts(products);
                this.categoryName.innerText = 'Все товары';
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
