import './index.style.scss';
import { SearchResults } from '@/widgets/searchResults';
import searchPageTmpl from './index.template.pug';
import { SearchPageProps } from './index.types';
import { Component } from '@/shared/@types/index.component';

export class SearchPage extends Component<HTMLDivElement, SearchPageProps> {
    protected searchResults: SearchResults;

    constructor(
        parent: Element,
        navigateToMain: () => void,
        navigateToCart: () => void,
        params: { [name: string]: string },
    ) {
        super(parent, searchPageTmpl, {
            className: 'search-page',
            query: params.query,
            navigateToMain: navigateToMain,
            navigateToCart: navigateToCart,
        });
    }

    updateWithParams(params: { [name: string]: string }) {
        if (params.query) {
            this.searchQuery(params.query);
        }
    }

    updateNoParams() {
        this.props.navigateToMain();
    }

    searchQuery(query: string) {
        this.searchResults.searchByQuery(query);
    }

    protected render() {
        if (this.props.query !== undefined) {
            this.renderTemplate();

            this.searchResults = new SearchResults(this.htmlElement, {
                className: 'search-page__search-results',
                query: this.props.query,
                toCart: this.props.navigateToCart,
            });
        }

        if (this.props.query === undefined) {
            this.props.navigateToMain();
        }
    }
}
