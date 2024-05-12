import appTmplFunc from './index.template.pug';
import './index.style.scss';
import { Component } from '@/shared/@types/index.component';
import { Page, Router } from './../providers';
import { Navbar } from '@/widgets/navbar';
import { getConfig } from './../providers';
import { registerSW } from '../providers/serviceWorker';
import { getMainUserData } from '@/entities/user/api';
import { throttle } from '@/shared/api/ajax/throttling';

export class App extends Component<HTMLDivElement> {
    router: Router;
    protected page: Component<Element>;
    protected activePageName: string;
    protected contentElement: HTMLDivElement;
    protected throttledUserInfo: typeof getMainUserData;
    pages: { [name: string]: Page };
    headerElement: HTMLDivElement;
    navbar: Navbar;
    mobileNavbar: Navbar;

    constructor(parent: Element) {
        super(parent, appTmplFunc, { className: 'app-layout' });
    }

    changePage(isLogged: boolean) {
        const { name, getComponent, renderChild, update, rawPage } =
            this.router.currentActivePage;

        if (name != this.activePageName) {
            this.contentElement.innerHTML = '';
            this.page = getComponent(this.contentElement);
            this.activePageName = name;
        }

        if (renderChild) {
            renderChild(this.page);
        }

        if (update) {
            update(this.page);
        }

        if (rawPage) {
            this.headerElement.classList.add('display_none');
            this.headerElement.classList.remove('navbar-container');
            this.mobileNavbar.htmlElement.parentElement.classList.add(
                'display_none',
            );
            this.mobileNavbar.htmlElement.parentElement.classList.remove(
                'navbar-container',
            );
        }

        if (!rawPage) {
            this.headerElement.classList.remove('display_none');
            this.headerElement.classList.add('navbar-container');
            this.mobileNavbar.htmlElement.parentElement.classList.remove(
                'display_none',
            );
            this.mobileNavbar.htmlElement.parentElement.classList.add(
                'navbar-container',
            );
            this.navbar.updateNavbar(name, isLogged);
            this.mobileNavbar.updateNavbar(name, isLogged);
        }

        if (isLogged) {
            this.updateNavbarBadges();
        }
    }

    protected updateNavbarBadges() {
        this.throttledUserInfo()
            .then(({ status, data }) => {
                if (status === 200) {
                    const totalCartItems = data.cartItemsAmount;
                    this.navbar.updateBadge('cart', totalCartItems.toString());
                    this.mobileNavbar.updateBadge(
                        'cart',
                        totalCartItems.toString(),
                    );

                    if (totalCartItems > 0) {
                        this.navbar.showBadge('cart');
                        this.mobileNavbar.showBadge('cart');
                    }

                    if (totalCartItems <= 0) {
                        this.navbar.hideBadge('cart');
                        this.mobileNavbar.hideBadge('cart');
                    }
                }
            })
            .catch(() => {});
    }

    protected componentDidMount() {
        this.htmlElement.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.dataset['link'] !== undefined
            ) {
                this.router.handleLinkClick(e);
            }
        });

        this.throttledUserInfo = throttle(getMainUserData, 2000);

        // registerSW();
    }

    protected render() {
        this.renderTemplate();

        this.contentElement = this.htmlElement.getElementsByClassName(
            'content',
        )[0] as HTMLDivElement;

        this.headerElement = this.htmlElement.getElementsByClassName(
            'navbar-container',
        )[0] as HTMLDivElement;

        const { routerConfig, navbarConfig, mobileNavbarConfig } = getConfig();
        this.router = new Router(
            (isLogged: boolean) => this.changePage(isLogged),
            routerConfig,
        );

        this.navbar = new Navbar(this.headerElement, {
            className: 'navbar__navigation',
            navigateCategoryPage: this.router.getNavigationToPage('category'),
            navigateSearchPage: this.router.getNavigationToPage('search'),
        });

        this.mobileNavbar = new Navbar(
            this.htmlElement.getElementsByClassName(
                'mobile-navbar-container',
            )[0],
            {
                className: 'mobile-navbar__navigation',
                withSearch: false,
                type: 'mobile',
            },
        );

        Object.entries(navbarConfig).forEach(([name, { props, logged }]) => {
            this.navbar.addLink(name, logged, props);
        });

        Object.entries(mobileNavbarConfig).forEach(
            ([name, { props, logged }]) => {
                this.mobileNavbar.addLink(name, logged, props);
            },
        );

        this.router.start();

        this.componentDidMount();
    }
}
