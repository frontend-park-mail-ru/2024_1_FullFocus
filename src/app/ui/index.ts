import appTmplFunc from './index.template.pug';
import './index.style.scss';
import { Component } from '@/shared/@types/index.component';
import { Page, Router } from './../providers';
import { Navbar } from '@/widgets/navbar';
import { getConfig } from './../providers';
import { registerSW } from '../providers/serviceWorker';
import { getMainUserData } from '@/entities/user/api';
import { throttle } from '@/shared/api/ajax/throttling';
import { getNotificationCards } from '@/features/notification';

export class App extends Component<HTMLDivElement> {
    router: Router;
    protected page: Component<Element>;
    protected activePageName: string;
    protected contentElement: HTMLDivElement;
    protected throttledUpdateBadges: () => void;
    protected throttledUserInfo: typeof getMainUserData;
    protected closeNotificationWS: () => void;
    protected restartNotifications: () => void;
    protected areNotificationsWorking: () => boolean;
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
            this.checkConnection();
            this.updateNavbarBadges();
        }

        if (!isLogged) {
            if (this.areNotificationsWorking()) {
                this.closeNotificationWS();
            }
        }
    }

    protected checkConnection() {
        if (!this.isWsInited() || !this.areNotificationsWorking()) {
            this.initWS();
        }
    }

    protected isWsInited() {
        return (
            this.closeNotificationWS !== undefined &&
            this.restartNotifications !== undefined &&
            this.areNotificationsWorking !== undefined
        );
    }

    protected initWS() {
        const notifications = getNotificationCards();
        this.closeNotificationWS = notifications.close;
        this.restartNotifications = notifications.retryConnection;
        this.areNotificationsWorking = notifications.isConnected;
    }

    protected updateNavbarBadges() {
        getMainUserData()
            .then(({ status, data }) => {
                if (status === 200) {
                    // Update cart icon badges
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

                    // Update profile icon badges
                    const totalProfileMsgs =
                        data.unreadNotifications + data.promocodesAvailable;
                    this.navbar.updateBadge(
                        'profile',
                        totalProfileMsgs.toString(),
                    );
                    this.navbar.updateBadge(
                        'profile',
                        data.unreadNotifications.toString(),
                        'notifications',
                    );
                    this.navbar.updateBadge(
                        'profile',
                        data.promocodesAvailable.toString(),
                        'promocodes',
                    );
                    this.mobileNavbar.updateBadge(
                        'profile',
                        totalProfileMsgs.toString(),
                    );

                    if (totalProfileMsgs > 0) {
                        this.navbar.showBadge('profile');
                        this.mobileNavbar.showBadge('profile');
                    }

                    if (totalProfileMsgs <= 0) {
                        this.navbar.hideBadge('profile');
                        this.mobileNavbar.hideBadge('profile');
                    }
                }
            })
            .catch(() => {});
    }

    protected componentDidMount() {
        document.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.dataset['link'] !== undefined
            ) {
                this.router.handleLinkClick(e);
            }
        });

        this.throttledUpdateBadges = throttle(
            () => this.updateNavbarBadges(),
            1000,
        );

        this.contentElement.addEventListener('updatenavbar', () => {
            this.throttledUpdateBadges();
        });

        registerSW();
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

        Object.entries(navbarConfig).forEach(
            ([name, { props, logged, children }]) => {
                this.navbar.addLink(name, logged, props, undefined, children);
            },
        );

        Object.entries(mobileNavbarConfig).forEach(
            ([name, { props, logged }]) => {
                this.mobileNavbar.addLink(name, logged, props);
            },
        );

        this.router.start();

        this.componentDidMount();
    }
}
