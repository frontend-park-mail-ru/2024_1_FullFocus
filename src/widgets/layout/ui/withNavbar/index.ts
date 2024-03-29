import './style.scss';
import { config } from '@/shared/constants/config';
import { NavbarLink } from './navbarLink';
import withNavbarTmpl from './template.pug';
import { isUserLogged } from '@/features/auth';
import { PageItems, NavbarLinkItems } from './types';
import { Component } from '@/shared/@types/component';

export class WithNavbar extends Component<HTMLDivElement> {
    parent: Element;
    pageItems: PageItems;
    activePageName: string;
    navbarLinkItems: NavbarLinkItems;
    navbarElement: HTMLDivElement;
    contentElement: Element;
    private isLoggedIn: boolean;
    private listener: (e: Event) => void;

    /**
     * Constructor for WithNavbar object
     * @param {Element} parent - parent html element
     */
    constructor(parent: Element) {
        super(parent, withNavbarTmpl, { className: 'layout-with-navbar' });
        this.pageItems = {};
        this.activePageName = '';
        this.navbarLinkItems = {};
        this.isLoggedIn = false;
    }

    /**
     * Adds page
     * @param {any} pageItem - page object
     */
    addPage(pageItem: Component<Element>, name: string) {
        this.pageItems[name] = pageItem;
    }

    /**
     * Change page
     * @param {string} pageName - name of the page to go
     */
    goToPage(pageName: string) {
        this.contentElement.innerHTML = '';
        this.activePageName = pageName;
        this.updateNavbar();

        this.pageItems[pageName].render();
    }

    private componentDidMount() {
        this.listener = (e: Event) => {
            const target = e.target as HTMLLinkElement;

            if (target.tagName.toLowerCase() === 'a') {
                e.preventDefault();

                this.goToPage(target.dataset.section);
            }
        };
        this.navbarElement.addEventListener('click', this.listener);
    }

    private componentWillUnmount() {
        this.navbarElement.removeEventListener('click', this.listener);
    }

    /**
     * Renders page with navbar
     */
    render() {
        super.render();
        console.log(this);

        this.contentElement = this.htmlElement.getElementsByClassName(
            'content',
        )[0] as HTMLDivElement;

        this.navbarElement = this.parent.getElementsByClassName(
            'navbar__navigation',
        )[0] as HTMLDivElement;

        this.componentDidMount();
    }

    destroy(): void {
        super.destroy();
        this.componentWillUnmount();
    }

    /**
     * Updates navbar
     */
    updateNavbar() {
        isUserLogged()
            .then((isLogged) => {
                this.navbarElement.innerHTML = '';
                this.isLoggedIn = isLogged;

                Object.keys(this.pageItems).forEach((pageName) => {
                    if (
                        (this.isLoggedIn &&
                            config.menu[pageName].userLogged === 'unlogged') ||
                        (!this.isLoggedIn &&
                            config.menu[pageName].userLogged === 'unlogged') ||
                        config.menu[pageName].userLogged === 'both'
                    ) {
                        const navbarLinkItem = new NavbarLink(
                            this.navbarElement,
                            {
                                className: 'navigation-link-' + pageName,
                                section: pageName,
                                href: config.menu[pageName].href,
                                text: config.menu[pageName].text,
                            },
                        );

                        navbarLinkItem.render();

                        if (pageName === this.activePageName) {
                            navbarLinkItem.activate();
                        }

                        this.navbarLinkItems[pageName] = navbarLinkItem;
                    }
                });
            })
            .catch(() => {
                this.isLoggedIn = false;
            });
    }
}
