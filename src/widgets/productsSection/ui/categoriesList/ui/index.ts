import './index.style.scss';
import navbarTmplFunc from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileNavbarProps } from './index.types';
import { Link } from '@/shared/uikit/link';
import { getCategories } from '@/entities/productsSection';

export class CategoriesList extends Component<
    HTMLDivElement,
    ProfileNavbarProps
> {
    protected activePageId: number;
    protected categories: { [id: number]: string };
    protected navbarItems: { [id: number]: Link };

    constructor(parent: Element, props: ProfileNavbarProps) {
        super(parent, navbarTmplFunc, props);
    }

    protected render() {
        this.renderTemplate();

        this.navbarItems = {};
        this.categories = {};
        this.activePageId = undefined;

        getCategories()
            .then(({ status, data }) => {
                if (status === 200) {
                    data.forEach((category) => {
                        this.categories[category.id] = category.name;
                        this.navbarItems[category.id] = new Link(
                            this.htmlElement,
                            {
                                className: `category-link-${category.id}`,
                                href: `/?category=${category.id}`,
                                text: category.name,
                                style: 'with-bg',
                            },
                        );
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
