import './index.style.scss';
import searchResultsTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { SearchResultsProps } from './index.types';
import { useGetProductCardsSearch } from '@/features/product/ui';
import { ProductsList } from '@/entities/productsSection';
import { ProductCard } from '@/entities/product';
import { animateLongRequest } from '@/shared/api/ajax/throttling';

export class SearchResults extends Component<
    HTMLDivElement,
    SearchResultsProps
> {
    protected productsList: ProductsList<ProductCard>;
    protected header: HTMLDivElement;
    protected curretnQuery: string;

    constructor(parent: Element, props: SearchResultsProps) {
        super(parent, searchResultsTmpl, props);
    }

    searchByQuery(query: string, sortId: string) {
        if (this.curretnQuery !== query) {
            this.header.innerText = `Результаты поиска по запросу "${query}"`;
            this.curretnQuery = query;
        }

        animateLongRequest(
            () => {
                return useGetProductCardsSearch(query, 1, 15, sortId);
            },
            (cards) => {
                this.productsList.loadProducts(cards);
            },
            () => {
                this.productsList.clear();
                this.header.innerText = `Что-то пошло не так`;
            },
            () => {
                this.productsList.setLoading('700px');
            },
            () => {
                this.productsList.removeLoading();
            },
            150,
            1000,
        )();
    }

    get headerHtml() {
        return this.htmlElement.getElementsByClassName(
            'search-results__header-container',
        )[0];
    }

    protected render() {
        this.renderTemplate();

        this.productsList = new ProductsList(
            this.htmlElement.getElementsByClassName(
                'search-results__results',
            )[0],
            {
                className: 'search-results__products',
                navigateToCart: this.props.toCart,
            },
        );

        this.header = this.htmlElement.getElementsByClassName(
            'search-results__header',
        )[0] as HTMLDivElement;

        this.searchByQuery(this.props.query, this.props.sortId);
    }
}
