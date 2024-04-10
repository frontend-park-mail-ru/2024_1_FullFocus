import { Component } from '@/shared/@types/index.component';
import { Page, RouterConfig } from './index.types';
import { useCheckUserLogin } from '@/features/auth';

export { Page } from './index.types';

const PAGE_404 = 'PAGE_404';

export class Router {
    private activePage: string;
    private renderPage: (isLogged: boolean) => void;
    private pages: { [name: string]: Page };
    private urls: { [name: string]: string };
    private page404: () => Component<Element>;

    constructor(renderPage: (isLogged: boolean) => void, pages: RouterConfig) {
        this.renderPage = renderPage;
        this.page404 = pages.page404;
        this.pages = pages.pages;
        this.urls = {};
        Object.entries(this.pages).forEach(([name, { url }]) => {
            this.urls[url] = name;
        });
    }

    private pushState(url: string) {
        window.history.pushState({}, '', url);
        this.handlePopstate();
    }

    handlePopstate() {
        const path = window.location.pathname;
        useCheckUserLogin()
            .then((isLogged) => {
                if (path in this.urls) {
                    const pageName = this.urls[path];
                    const userLoginStatus = this.pages[pageName].logged;
                    if (
                        (userLoginStatus === 'logged' && isLogged) ||
                        (userLoginStatus === 'unlogged' && !isLogged) ||
                        userLoginStatus === 'both'
                    ) {
                        this.activePage = pageName;
                    }
                } else {
                    this.activePage = PAGE_404;
                }
                this.renderPage(isLogged);
            })
            .catch(() => {});
    }

    handleLinkClick(e: Event) {
        e.preventDefault();
        const target = e.target as HTMLLinkElement;
        this.pushState(target.href);
    }

    start() {
        window.addEventListener('popstate', () => {
            this.handlePopstate();
        });

        this.handlePopstate();
    }

    getNavigationToPage(pageName: string) {
        const navigateToPage = () => {
            if (pageName in this.pages) {
                this.pushState(this.pages[pageName].url);
            }
        };

        return navigateToPage;
    }

    get currentActivePage() {
        let component = null;

        if (this.activePage === PAGE_404) {
            component = this.page404();
        }

        if (this.activePage !== PAGE_404) {
            const navigation: Array<() => void> = [];
            if (this.pages[this.activePage].navigation != null) {
                this.pages[this.activePage].navigation.forEach(
                    (pageToNavigate: string) => {
                        navigation.push(
                            this.getNavigationToPage(pageToNavigate),
                        );
                    },
                );
            }

            const params: { [name: string]: string } = {};
            const urlParams = new URLSearchParams(window.location.search);

            for (const [key, value] of urlParams.entries()) {
                params[key] = value;
            }

            component = this.pages[this.activePage].component(
                params,
                ...navigation,
            );
        }

        return {
            name: this.activePage,
            component: component,
        };
    }
}
