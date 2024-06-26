import './index.style.scss';
import searchBarTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { SearchBarProps } from './index.types';
import { Button, getExitBtn } from '@/shared/uikit/button';
import { List } from '@/shared/uikit/list';
import { Input } from '@/shared/uikit/input';
import {
    SearchSuggestion,
    magnifierIconTmpl,
    useGetSearchSuggestions,
} from '@/features/search';
import { isClickOut } from '@/shared/lib/clickOut';
import { insertDarkOverlay } from '@/shared/lib/darkOverlay';
import { throttle } from '@/shared/api/ajax/throttling';

export class SearchBar extends Component<HTMLElement, SearchBarProps> {
    protected searchBtn: Button;
    protected clearBtn: Button;
    protected inputField: Input;
    protected searchResults: List<SearchSuggestion>;
    protected overlay: HTMLDivElement;
    protected form: HTMLFormElement;
    protected throttledRenderSuggestions: (input: string) => void;
    protected focus: boolean;
    protected currentPromise: Promise<
        ((parent: Element) => {
            item: SearchSuggestion;
            id: string;
        })[]
    >;

    constructor(parent: Element, props: SearchBarProps) {
        super(parent, searchBarTmpl, props);
    }

    protected componentDidMount() {
        // TODO remove listener
        this.throttledRenderSuggestions = throttle(
            (input) => this.renderSuggestions(input),
            1000,
        );

        // Searchbar focused
        this.inputField.htmlElement.addEventListener('focus', (e: Event) => {
            e.preventDefault();
            if (!this.focus) {
                this.focus = true;
                this.htmlElement.classList.add('searchbar-container_focus');
                this.overlay = insertDarkOverlay(this.htmlElement);
            }
        });

        // User clicks out of searchbar area so it needs to be closed
        document.addEventListener('click', (e: MouseEvent) => {
            if (isClickOut(this.htmlElement, e) && this.focus) {
                this.hideSuggestions();
            }
        });

        // User inputs
        this.inputField.htmlElement.addEventListener('input', () => {
            const inputData = this.inputField.inputValue;

            if (inputData === '') {
                this.clearResults();
            }

            if (inputData !== '') {
                this.throttledRenderSuggestions(inputData);
            }
        });

        // Clear button
        this.clearBtn.htmlElement.addEventListener('click', (e: Event) => {
            e.preventDefault();
            this.clearResults();
        });

        this.searchResults.htmlElement.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const targetInit = e.target as HTMLElement;
            if (
                targetInit.classList.contains('search-result__to-input-btn') ||
                targetInit.dataset['btnicon'] !== undefined
            ) {
                // Auto complete
                const target = targetInit.closest('.search-result');
                if (target && this.focus) {
                    const inputData = (target as HTMLElement).innerText;
                    this.inputField.inputValue = inputData;
                    this.renderSuggestions(inputData);
                }
            } else {
                // Perform search
                const target = targetInit.closest('.search-result');
                if (
                    target &&
                    (target as HTMLDivElement).dataset['categoryId']
                ) {
                    this.performCategorySearch(
                        (target as HTMLDivElement).dataset['categoryId'],
                    );
                }
                if (
                    target &&
                    !(target as HTMLDivElement).dataset['categoryId']
                ) {
                    this.performItemSearch(
                        (target as HTMLDivElement).innerText,
                    );
                }
            }
        });

        // Search item
        this.htmlElement.addEventListener('submit', (e: SubmitEvent) => {
            e.preventDefault();
            if (this.inputField.inputValue !== '') {
                this.performItemSearch(this.inputField.inputValue);
            }
        });
    }

    protected clearResults() {
        this.inputField.inputValue = '';
        this.searchResults.clear();
        this.clearBtn.hide();
    }

    protected hideSuggestions() {
        this.focus = false;
        this.htmlElement.classList.remove('searchbar-container_focus');
        this.overlay.remove();
    }

    protected performItemSearch(query: string) {
        this.clearBtn.hide();
        this.clearResults();
        this.hideSuggestions();
        this.props.navigateSearchPage({
            query: query,
        });
    }

    protected performCategorySearch(categoryId: string) {
        this.clearResults();
        this.hideSuggestions();
        this.props.navigateCategoryPage({
            categoryId: categoryId,
        });
    }

    protected renderSuggestions(input: string) {
        if (this.inputField.inputValue.length > 0) {
            this.clearBtn.show();
            useGetSearchSuggestions(input)
                ?.then((items) => {
                    if (items.length > 0) {
                        this.searchResults.renderItems(items);
                    }
                })
                .catch(() => {});
        }
    }

    protected render() {
        this.renderTemplate();

        this.focus = false;

        const searchBar =
            this.htmlElement.getElementsByClassName('searchbar')[0];

        this.inputField = new Input(searchBar, {
            className: 'searchbar__input',
            placeholder: 'поиск на Bizon',
            type: 'text',
            name: 'searchbar-input',
            status: 'notValidated',
        });

        this.clearBtn = getExitBtn(searchBar, {
            className: 'searchbar__clear-btn',
            type: 'button',
            btnStyle: 'white',
            size: 'xs',
        });

        this.clearBtn.hide();

        this.searchBtn = new Button(searchBar, {
            className: 'searchbar__btn',
            type: 'submit',
            btnStyle: 'bright',
            btnIconFunc: magnifierIconTmpl,
        });

        this.searchResults = new List<SearchSuggestion>(
            this.htmlElement.getElementsByClassName(
                'searchbar-container__search-results',
            )[0],
            { className: 'search-results', wrap: false },
        );

        this.componentDidMount();
    }
}
