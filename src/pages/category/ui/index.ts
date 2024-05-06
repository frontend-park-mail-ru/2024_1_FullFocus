import './index.style.scss';
import categoryPageTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { CategoryPageProps } from './index.types';
import { CategorySearchResults } from '@/widgets/categorySearchResults';

export class CategoryPage extends Component<HTMLDivElement, CategoryPageProps> {
    protected categorySearchResults: CategorySearchResults;

    constructor(
        parent: Element,
        navigateToMain: () => void,
        navigateToCart: () => void,
        params: { categoryId: string; [name: string]: string },
    ) {
        super(parent, categoryPageTmpl, {
            className: 'category-page',
            categoryId: Number(params.categoryId),
            navigateToMain: navigateToMain,
            navigateToCart: navigateToCart,
        });
    }

    updateWithParams(params: { [name: string]: string }) {
        if (params.categoryId) {
            this.loadCategory(Number(params.categoryId));
        }
    }

    updateNoParams() {
        this.props.navigateToMain();
    }

    loadCategory(categoryId: number) {
        this.categorySearchResults.loadCategory(categoryId);
    }

    clearProducts() {
        this.categorySearchResults.clear();
    }

    protected render() {
        if (!isNaN(this.props.categoryId)) {
            this.renderTemplate();

            this.categorySearchResults = new CategorySearchResults(
                this.htmlElement,
                {
                    className: 'category-page__products',
                    categoryId: this.props.categoryId,
                    toCart: this.props.navigateToCart,
                },
            );
        }

        if (isNaN(this.props.categoryId)) {
            this.props.navigateToMain();
        }
    }
}
