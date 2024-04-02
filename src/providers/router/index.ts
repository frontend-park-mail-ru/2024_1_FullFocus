import { Page } from './types';

export { Page } from './types';

export class Router {
    private activePage: string;
    private renderPage: () => void;
    private pages: { [name: string]: Page };
    private urls: { [name: string]: string };

    constructor(renderPage: () => void, pages: { [name: string]: Page }) {
        this.renderPage = renderPage;
        this.pages = pages;
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
        this.activePage = this.urls[path];
        this.renderPage();
    }

    handleLinkClick(e: Event) {
        e.preventDefault();
        const target = e.target as HTMLLinkElement;
        if (target.tagName.toLowerCase() === 'a') {
            this.pushState(target.href);
        }
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
        return {
            name: this.activePage,
            component: this.pages[this.activePage].component(
                this.pages[this.activePage].navigation == null
                    ? null
                    : this.getNavigationToPage(
                          this.pages[this.activePage].navigation,
                      ),
            ),
        };
    }
}
