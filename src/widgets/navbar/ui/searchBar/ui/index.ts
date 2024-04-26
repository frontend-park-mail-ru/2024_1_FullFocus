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

export class SearchBar extends Component<HTMLElement, SearchBarProps> {
    protected searchBtn: Button;
    protected clearBtn: Button;
    protected inputField: Input;
    protected searchResults: List<SearchSuggestion>;
    protected overlay: HTMLDivElement;
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
        this.inputField.htmlElement.addEventListener('focus', (e: Event) => {
            e.preventDefault();
            if (!this.focus) {
                this.focus = true;
                this.htmlElement.classList.add('searchbar-container_focus');
                this.overlay = insertDarkOverlay(this.htmlElement);
            }
        });

        document.addEventListener('click', (e: MouseEvent) => {
            if (isClickOut(this.htmlElement, e) && this.focus) {
                this.focus = false;
                this.htmlElement.classList.remove('searchbar-container_focus');
                this.overlay.remove();
            }
        });

        this.inputField.htmlElement.addEventListener('input', () => {
            const inputData = this.inputField.inputValue;

            if (inputData === '') {
                this.clearResults();
            }

            if (inputData !== '') {
                this.renderSuggestions(inputData);
            }
        });

        this.clearBtn.htmlElement.addEventListener('click', (e: Event) => {
            e.preventDefault();
            this.clearResults();
        });

        this.searchResults.htmlElement.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const target = (e.target as HTMLElement).closest(
                '.search-result__to-input-btn',
            );

            if (target && this.focus) {
                const inputData = (target as HTMLElement).dataset.text;
                this.inputField.inputValue = inputData;
                this.renderSuggestions(inputData);
            }
        });
    }

    protected render() {
        this.renderTemplate();

        this.focus = false;

        const searchBar =
            this.htmlElement.getElementsByClassName('searchbar')[0];

        this.inputField = new Input(searchBar, {
            className: 'searchbar__input',
            placeholder: 'поиск',
            type: 'text',
            name: 'searchbar-input',
            status: 'notValidated',
        });

        this.clearBtn = getExitBtn(searchBar, {
            className: 'searchbar__clear-btn',
            type: 'button',
            btnStyle: 'white',
        });

        this.clearBtn.hide();

        this.searchBtn = new Button(searchBar, {
            className: 'searchbar__btn',
            type: 'button',
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

    protected clearResults() {
        this.inputField.inputValue = '';
        this.searchResults.clear();
        this.clearBtn.hide();
    }

    protected renderSuggestions(input: string) {
        this.clearBtn.show();
        this.currentPromise = useGetSearchSuggestions(input);
        this.currentPromise
            .then((items) => {
                if (items.length > 0) {
                    this.searchResults.renderItems(items);
                }
            })
            .catch(() => {
                // TODO add ui for this
                console.log('что-то пошло не так');
            });
    }
}
