import './index.style.scss';
import categoryPageTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { CategoryPageProps } from './index.types';
import { CategorySearchResults } from '@/widgets/categorySearchResults';
import { DropDown } from '@/shared/uikit/dropdown';
import { TextItem } from '@/shared/uikit/textItem';
import { changeSortItem, useGetSortDropdown } from '@/features/sort';

export class CategoryPage extends Component<HTMLDivElement, CategoryPageProps> {
    protected categorySearchResults: CategorySearchResults;
    protected sortDropdown: DropDown<TextItem>;
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
            sortId: params['sortID'],
            navigateToMain: navigateToMain,
            navigateToCart: navigateToCart,
            navigateToCategory: navigateToCategory,
        });
    }

    updateWithParams(params: { [name: string]: string }) {
        if (params.categoryId) {
            this.loadCategory(Number(params.categoryId), params['sortID']);
        }

        if (params.sortID) {
            changeSortItem(this.sortDropdown, params.sortID);
        }
    }

    updateNoParams() {
        this.props.navigateToMain();
    }

    loadCategory(categoryId: number, sortId: string) {
        this.categoryId = categoryId;
        this.categorySearchResults.loadCategory(categoryId, sortId);
    }

    clearProducts() {
        this.categorySearchResults.clear();
    }

    protected componentDidMount() {
        this.sortDropdown.htmlElement.addEventListener('click', (e: Event) => {
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

            this.categorySearchResults = new CategorySearchResults(
                this.htmlElement,
                {
                    className: 'category-page__products',
                    categoryId: this.props.categoryId,
                    toCart: this.props.navigateToCart,
                    sortId: this.props.sortId,
                },
            );

            useGetSortDropdown(
                this.categorySearchResults.headerHtml,
                'category-page__sort-dropdown',
                this.props.sortId,
            )
                .then((dropdown) => {
                    this.sortDropdown = dropdown;
                    this.componentDidMount();
                })
                .catch(() => {});
        }

        if (isNaN(this.props.categoryId)) {
            this.props.navigateToMain();
        }
    }
}
