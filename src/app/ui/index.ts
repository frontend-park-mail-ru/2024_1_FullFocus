import appTmplFunc from './index.template.pug';
import './index.style.scss';
import './mobile icons';
import { Component } from '@/shared/@types/index.component';
import { Page, Router } from './../providers';
import { Navbar } from '@/widgets/navbar';
import { getConfig } from './../providers';
import { registerSW } from '../providers/serviceWorker';

export class App extends Component<HTMLDivElement> {
    router: Router;
    private page: Component<Element>;
    private activePageName: string;
    private contentElement: HTMLDivElement;
    pages: { [name: string]: Page };
    headerElement: HTMLDivElement;
    navbar: Navbar;
    mobileNavbar: Navbar;

    constructor(parent: Element) {
        super(parent, appTmplFunc, { className: 'app-layout' });
    }

    changePage(isLogged: boolean) {
        const { name, getComponent, renderChild, update } =
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

        this.navbar.updateNavbar(name, isLogged);
        this.mobileNavbar.updateNavbar(name, isLogged);
    }

    private componentDidMount() {
        this.htmlElement.addEventListener('click', (e: Event) => {
            const classList = (e.target as HTMLElement).classList;
            if (classList.contains('link-item')) {
                this.router.handleLinkClick(e);
            }
        });

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
