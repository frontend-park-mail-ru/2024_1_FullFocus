import appTmplFunc from './template.pug';
import './style.scss';
import { Component } from '@/shared/@types/component';
import { Page, Router } from '@/providers';
import { Navbar } from '@/widgets/navbar';
import { getConfig } from '../config';

export class App extends Component<HTMLDivElement> {
    router: Router;
    private page: Component<Element>;
    private contentElement: HTMLDivElement;
    pages: { [name: string]: Page };
    headerElement: HTMLDivElement;
    navbar: Navbar;

    constructor(parent: Element) {
        super(parent, appTmplFunc, { className: 'app-layout' });
    }

    changePage() {
        this.contentElement.innerHTML = '';

        const { name, component } = this.router.currentActivePage;
        this.navbar.updateNavbar(name);

        this.page = component;
    }

    private componentDidMount() {
        this.navbar.htmlElement.addEventListener('click', (e: Event) => {
            this.router.handleLinkClick(e);
        });
    }

    protected render() {
        this.renderTemplate();

        this.contentElement = this.htmlElement.getElementsByClassName(
            'content',
        )[0] as HTMLDivElement;

        this.headerElement = this.htmlElement.getElementsByClassName(
            'header',
        )[0] as HTMLDivElement;

        const { routerConfig, navbarConfig } = getConfig(this.contentElement);

        this.navbar = new Navbar(this.headerElement, {
            className: 'navbar__navigation',
        });

        Object.entries(navbarConfig).forEach(([name, { props, logged }]) => {
            this.navbar.addLink(name, logged, props);
        });

        this.router = new Router(() => this.changePage(), routerConfig);
        this.router.start();

        this.componentDidMount();
    }
}
