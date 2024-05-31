import './index.style.scss';
import navbarTmplFunc from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileNavbarProps } from './index.types';
import { Link } from '@/shared/uikit/link';
import { getCategories } from '@/entities/productsSection';
import { DropDown } from '@/shared/uikit/dropdown';
import { animateLongRequest } from '@/shared/api/ajax/throttling';

export class CategoriesList extends Component<
    HTMLDivElement,
    ProfileNavbarProps
> {
    protected activePageId: number;
    protected categories: { [id: number]: string };
    protected navbarItems: { [id: number]: Link };
    protected categoriesDropDown: DropDown<Link>;
    protected categoriesContainer: HTMLDivElement;

    constructor(parent: Element, props: ProfileNavbarProps) {
        super(parent, navbarTmplFunc, props);
    }

    protected setLoading() {
        this.categoriesContainer.classList.add('categories-list--loading');
        this.categoriesDropDown.startLoading();
    }

    protected removeLoading() {
        this.categoriesContainer.classList.remove('categories-list--loading');
        this.categoriesDropDown.stopLoading();
    }

    protected render() {
        this.renderTemplate();

        this.navbarItems = {};
        this.categories = {};
        this.activePageId = undefined;

        this.categoriesDropDown = new DropDown(this.htmlElement, {
            className: 'categories-list-dropdown',
            defaultText: 'Категории',
            size: 'fill',
            border: false,
        });

        this.categoriesContainer = this.htmlElement.getElementsByClassName(
            'categories-list__categories-container',
        )[0] as HTMLDivElement;

        animateLongRequest(
            getCategories,
            ({ status, data }) => {
                if (status === 200) {
                    const categoriesList = this.categoriesContainer;
                    data.forEach((category) => {
                        this.categories[category.id] = category.name;
                        this.navbarItems[category.id] = new Link(
                            categoriesList,
                            {
                                className: `category-link-${category.id}`,
                                href: `/category/${category.id}`,
                                text: category.name,
                                style: 'with-bg',
                            },
                        );

                        this.categoriesDropDown.addItem((parent: Element) => {
                            return {
                                item: new Link(parent, {
                                    className: `dropdown-category-link-${category.id}`,
                                    href: `/category/${category.id}`,
                                    text: category.name,
                                    textSize: 'header',
                                }),
                                id: category.id.toString(),
                            };
                        });
                    });
                    if (this.props.activeItemId) {
                        this.changeActiveItem(this.props.activeItemId);
                    }
                    if (this.props.categoriesLoadedCallback) {
                        this.props.categoriesLoadedCallback();
                    }
                }
            },
            () => {},
            () => {
                this.setLoading();
            },
            () => {
                this.removeLoading();
            },
            150,
            1000,
        )();
    }

    clearActive() {
        if (this.activePageId in this.navbarItems) {
            this.navbarItems[this.activePageId].deactivate();
        }
    }

    changeActiveItem(activePageId: number) {
        if (activePageId in this.navbarItems) {
            if (this.activePageId != undefined) {
                this.navbarItems[this.activePageId].deactivate();
            }

            this.activePageId = activePageId;
            this.navbarItems[this.activePageId].activate();
        }
    }

    categoryNameById(id: number) {
        return this.categories[id];
    }
}
