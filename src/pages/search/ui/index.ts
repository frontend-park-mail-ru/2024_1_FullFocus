import searchPageTmpl from './index.template.pug';
import { SearchPageProps } from './index.types';
import { Component } from '@/shared/@types/index.component';

export class SearchPage extends Component<HTMLDivElement, SearchPageProps> {
    constructor(parent: Element, params: { [name: string]: string }) {
        super(parent, searchPageTmpl, {
            className: 'search-page',
            query: params.query,
        });
    }

    protected render() {
        this.renderTemplate();
        console.log(this.props.query);
    }
}
