import './index.style.scss';
import searchResultsTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { CategorySearchResultsProps } from './index.types';
import { useGetProductCardsCategory } from '@/features/product/ui';
import { ProductsList } from '@/entities/productsSection';
import { ProductCard } from '@/entities/product';

export class CategorySearchResults extends Component<
    HTMLDivElement,
    CategorySearchResultsProps
> {
    protected productsList: ProductsList<ProductCard>;
    protected header: HTMLDivElement;

    constructor(parent: Element, props: CategorySearchResultsProps) {
        super(parent, searchResultsTmpl, props);
    }

    loadCategory(categoryId: number, sortId: number) {
        this.header.innerText = `Поиск по категории`;
        useGetProductCardsCategory(categoryId, sortId)
            .then(({ products, category }) => {
                this.productsList.loadProducts(products);
                this.header.innerText += ` ${category}`;
            })
            .catch(() => {
                this.productsList.clear();
                this.header.innerText = `Что-то пошло не так`;
            });
    }

    clear() {
        this.productsList.clear();
        this.header.innerText = '';
    }

    protected render() {
        this.renderTemplate();

        this.productsList = new ProductsList(
            this.htmlElement.getElementsByClassName(
                'category-search-results__results',
            )[0],
            {
                className: 'category-search-results__products',
                navigateToCart: this.props.toCart,
            },
        );

        this.header = this.htmlElement.getElementsByClassName(
            'category-search-results__header',
        )[0] as HTMLDivElement;

        this.loadCategory(this.props.categoryId, this.props.sortId);
    }
}
