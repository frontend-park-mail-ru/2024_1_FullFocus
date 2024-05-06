import './index.style.scss';
import categoryPageTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { CategoryPageProps } from './index.types';
import { CategorySearchResults } from '@/widgets/categorySearchResults';
import { SortWidget } from '@/widgets/sort/ui';

export class CategoryPage extends Component<HTMLDivElement, CategoryPageProps> {
    protected categorySearchResults: CategorySearchResults;
    protected sortWidget: SortWidget;
    protected categoryId: number;

    constructor(
        parent: Element,
        navigateToMain: () => void,
        navigateToCart: () => void,
        navigateToCategory: () => void,
        params: { categoryId: string; [name: string]: string },
    ) {
        super(parent, categoryPageTmpl, {
            className: 'category-page',
            categoryId: Number(params.categoryId),
            sortId: Number(params['sortID']),
            navigateToMain: navigateToMain,
            navigateToCart: navigateToCart,
            navigateToCategory: navigateToCategory,
        });
    }

    updateWithParams(params: { [name: string]: string }) {
        if (params.categoryId) {
            this.loadCategory(
                Number(params.categoryId),
                Number(params['sortID']),
            );
        }
    }

    updateNoParams() {
        this.props.navigateToMain();
    }

    loadCategory(categoryId: number, sortId: number) {
        this.categoryId = categoryId;
        this.categorySearchResults.loadCategory(categoryId, sortId);
    }

    clearProducts() {
        this.categorySearchResults.clear();
    }

    protected componentDidMount() {
        this.sortWidget.htmlElement.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.dataset['sortID']) {
                this.props.navigateToCategory({
                    sortID: target.dataset['sortID'],
                    categoryId: this.categoryId.toString(),
                });
            }
        });
    }

    protected render() {
        if (!isNaN(this.props.categoryId)) {
            this.renderTemplate();

            this.categoryId = this.props.categoryId;

            this.sortWidget = new SortWidget(this.htmlElement, {
                className: 'sort-widget',
            });
            this.categorySearchResults = new CategorySearchResults(
                this.htmlElement,
                {
                    className: 'category-page__products',
                    categoryId: this.props.categoryId,
                    toCart: this.props.navigateToCart,
                    sortId: this.props.sortId,
                },
            );
            this.componentDidMount();
        }

        if (isNaN(this.props.categoryId)) {
            this.props.navigateToMain();
        }
    }
}
