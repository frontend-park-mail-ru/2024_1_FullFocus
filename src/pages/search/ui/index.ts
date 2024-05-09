import './index.style.scss';
import { SearchResults } from '@/widgets/searchResults';
import searchPageTmpl from './index.template.pug';
import { SearchPageProps } from './index.types';
import { Component } from '@/shared/@types/index.component';
import { useGetSortDropdown, changeSortItem } from '@/features/sort';
import { DropDown } from '@/shared/uikit/dropdown';
import { TextItem } from '@/shared/uikit/textItem';

export class SearchPage extends Component<HTMLDivElement, SearchPageProps> {
    protected searchResults: SearchResults;
    protected sortDropdown: DropDown<TextItem>;
    protected query: string;

    constructor(
        parent: Element,
        navigateToMain: () => void,
        navigateToCart: () => void,
        navigateToSearch: () => void,
        params: { [name: string]: string },
    ) {
        super(parent, searchPageTmpl, {
            className: 'search-page',
            query: params.query,
            sortId: params['sortID'],
            navigateToMain: navigateToMain,
            navigateToCart: navigateToCart,
            navigateToSearch: navigateToSearch,
        });
    }

    updateWithParams(params: { [name: string]: string }) {
        if (params.query) {
            this.searchQuery(params.query, params['sortID']);
        }

        if (params.sortID) {
            changeSortItem(this.sortDropdown, params.sortID);
        }
    }

    updateNoParams() {
        this.props.navigateToMain();
    }

    searchQuery(query: string, sortId: string) {
        this.query = query;
        this.searchResults.searchByQuery(query, sortId);
    }

    protected componentDidMount() {
        this.sortDropdown.htmlElement.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.dataset['sortID']) {
                this.props.navigateToSearch({
                    sortID: target.dataset['sortID'],
                    query: this.query,
                });
            }
        });
    }

    protected render() {
        if (this.props.query !== undefined) {
            this.renderTemplate();
            this.query = this.props.query;

            this.searchResults = new SearchResults(this.htmlElement, {
                className: 'search-page__search-results',
                query: this.props.query,
                toCart: this.props.navigateToCart,
                sortId: this.props.sortId,
            });

            useGetSortDropdown(
                this.searchResults.headerHtml,
                'search-page__sort-dropdown',
                this.props.sortId,
            )
                .then((dropdown) => {
                    this.sortDropdown = dropdown;
                    this.componentDidMount();
                })
                .catch(() => {});
        }

        if (this.props.query === undefined) {
            this.props.navigateToMain();
        }
    }
}
