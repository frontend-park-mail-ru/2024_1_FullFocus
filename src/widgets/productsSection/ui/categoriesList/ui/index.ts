import './index.style.scss';
import navbarTmplFunc from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileNavbarProps } from './index.types';
import { Link } from '@/shared/uikit/link';
import { getCategories } from '@/entities/productsSection';
import { DropDown } from '@/shared/uikit/dropdown';

export class CategoriesList extends Component<
    HTMLDivElement,
    ProfileNavbarProps
> {
    protected activePageId: number;
    protected categories: { [id: number]: string };
    protected navbarItems: { [id: number]: Link };
    protected categoriesDropDown: DropDown<Link>;

    constructor(parent: Element, props: ProfileNavbarProps) {
        super(parent, navbarTmplFunc, props);
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

        getCategories()
            .then(({ status, data }) => {
                if (status === 200) {
                    const categoriesList =
                        this.htmlElement.getElementsByClassName(
                            'categories-list',
                        )[0];
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
            })
            .catch(() => {});
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
