import appTmplFunc from './index.template.pug';
import './index.style.scss';
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
        }

        if (!rawPage) {
            this.headerElement.classList.remove('display_none');
            this.headerElement.classList.add('navbar-container');
            this.navbar.updateNavbar(name, isLogged);
        }
    }

    private componentDidMount() {
        this.htmlElement.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === 'a') {
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

        const { routerConfig, navbarConfig } = getConfig();

        this.navbar = new Navbar(this.headerElement, {
            className: 'navbar__navigation',
        });

        Object.entries(navbarConfig).forEach(([name, { props, logged }]) => {
            this.navbar.addLink(name, logged, props);
        });

        this.router = new Router(
            (isLogged: boolean) => this.changePage(isLogged),
            routerConfig,
        );
        this.router.start();

        this.componentDidMount();
    }
}
