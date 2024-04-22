import { Component } from '@/shared/@types/index.component';
import { Page, RouterConfig } from './index.types';
import { useCheckUserLogin } from '@/features/auth';

export type { Page } from './index.types';

const PAGE_404 = 'PAGE_404';

export class Router {
    private activePage: string;
    private params: { [name: string]: string };
    private withParams: boolean;
    private renderPage: (isLogged: boolean) => void;
    private pages: { [name: string]: Page };
    private urls: { [name: string]: string };
    private page404: (parent: Element) => Component<Element>;

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
        if (url !== window.location.href) {
            window.history.pushState({}, '', url);
            this.handlePopstate();
        }
    }

    private parseSlug(url: string) {
        const match = url.match(/([/\w]*\/)(\w+)?/);
        if (match) {
            const parsedUrl = match.length >= 2 ? match[1] : undefined;
            const slug = match.length >= 3 ? match[2] : undefined;

            return { url: parsedUrl, slug: slug };
        }

        return { url: undefined, slug: undefined };
    }

    private parseQuery(fullPath: string) {
        const urlParams = new URLSearchParams(fullPath);
        return {
            params: urlParams.entries(),
            withParams: urlParams.size !== 0,
        };
    }

    handlePopstate() {
        this.params = {};
        useCheckUserLogin()
            .then((isLogged) => {
                const rawUrl = window.location.pathname;
                const { url, slug } = this.parseSlug(rawUrl);

                if (url in this.urls || rawUrl in this.urls) {
                    let pageName = this.urls[url];
                    if (!pageName || !this.pages[pageName].slugParamName) {
                        pageName = this.urls[rawUrl];
                    }

                    const needsLogin = this.pages[pageName].logged === 'logged';
                    if ((needsLogin && isLogged) || !needsLogin) {
                        this.activePage = pageName;
                        // Parsing query params
                        const queryParsing = this.parseQuery(
                            window.location.search,
                        );
                        this.withParams = queryParsing.withParams;
                        for (const [key, value] of queryParsing.params) {
                            this.params[key] = value;
                        }

                        // Slug params
                        if (this.pages[pageName].slugParamName) {
                            this.params[this.pages[pageName].slugParamName] =
                                slug;
                            this.withParams = true;
                        }
                    } else {
                        this.activePage = PAGE_404;
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
        const pages = this.pages;
        const navigateToPage = () => {
            if (pageName in pages) {
                this.pushState(this.pages[pageName].url);
            }
        };

        return navigateToPage;
    }

    get currentActivePage() {
        let basePage = this.activePage;
        let getComponent: (parent: Element) => Component<Element> = null;
        let renderChild = null;
        let update = null;

        if (this.activePage === PAGE_404) {
            getComponent = this.page404;
        }

        if (this.activePage !== PAGE_404) {
            // if current page is a subpage
            if (this.pages[this.activePage].base) {
                basePage = this.pages[this.activePage].base;
                renderChild = (page: Component<Element>) => {
                    this.pages[this.activePage].renderChild(page, this.params);
                };
            }

            if (this.withParams && this.pages[basePage].updateParams) {
                update = (page: Component<Element>) => {
                    this.pages[basePage].updateParams(page, this.params);
                };
            }

            if (!this.withParams && this.pages[basePage].updateDefault) {
                update = this.pages[basePage].updateDefault;
            }

            const navigation: Array<() => void> = [];
            if (this.pages[basePage].navigation != null) {
                this.pages[basePage].navigation.forEach(
                    (pageToNavigate: string) => {
                        navigation.push(
                            this.getNavigationToPage(pageToNavigate),
                        );
                    },
                );
            }

            getComponent = (parent: Element) => {
                return this.pages[basePage].component(
                    parent,
                    this.params,
                    ...navigation,
                );
            };
        }

        return {
            name: basePage,
            getComponent: getComponent,
            renderChild: renderChild,
            update: update,
        };
    }
}
