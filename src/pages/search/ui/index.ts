import './index.style.scss';
import { SearchResults } from '@/widgets/searchResults';
import searchPageTmpl from './index.template.pug';
import { SearchPageProps } from './index.types';
import { Component } from '@/shared/@types/index.component';
import { SortWidget } from '@/widgets/sort/ui';

export class SearchPage extends Component<HTMLDivElement, SearchPageProps> {
    protected searchResults: SearchResults;
    protected sortWidget: SortWidget;
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
            sortId: Number(params['sortID']),
            navigateToMain: navigateToMain,
            navigateToCart: navigateToCart,
            navigateToSearch: navigateToSearch,
        });
    }

    updateWithParams(params: { [name: string]: string }) {
        if (params.query) {
            this.searchQuery(params.query, Number(params['sortID']));
        }
    }

    updateNoParams() {
        this.props.navigateToMain();
    }

    searchQuery(query: string, sortId: number) {
        this.query = query;
        this.searchResults.searchByQuery(query, sortId);
    }

    protected componentDidMount() {
        this.sortWidget.htmlElement.addEventListener('click', (e: Event) => {
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
            this.sortWidget = new SortWidget(this.htmlElement, {
                className: 'sort-widget',
            });
            this.query = this.props.query;
            this.searchResults = new SearchResults(this.htmlElement, {
                className: 'search-page__search-results',
                query: this.props.query,
                toCart: this.props.navigateToCart,
                sortId: this.props.sortId,
            });
            this.componentDidMount();
        }

        if (this.props.query === undefined) {
            this.props.navigateToMain();
        }
    }
}
