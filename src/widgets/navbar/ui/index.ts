import navbarTmplFunc from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { NavbarProps } from './index.types';
import { NavbarLink } from './navbarLink';
import { NavbarLinkProps } from './navbarLink';
import { UserLogged } from './index.types';

export { UserLogged } from './index.types';

export class Navbar extends Component<HTMLDivElement, NavbarProps> {
    protected activeItemName: string;
    protected linkProps: Array<{
        pageName: string;
        userLogged: UserLogged;
        props: NavbarLinkProps;
    }>;
    protected navbarItems: { [name: string]: NavbarLink };

    constructor(parent: Element, props: NavbarProps) {
        super(parent, navbarTmplFunc, props);
        this.linkProps = [];
        this.navbarItems = {};
        this.activeItemName = undefined;
    }

    addLink(pageName: string, userLogged: UserLogged, props: NavbarLinkProps) {
        this.linkProps.push({
            pageName: pageName,
            userLogged: userLogged,
            props: props,
        });
    }

    updateNavbar(activePageName: string, isLogged: boolean) {
        if (this.activeItemName) {
            this.navbarItems[this.activeItemName].deactivate();
        }
        this.activeItemName = activePageName;

        this.htmlElement.innerHTML = '';
        this.linkProps.forEach(({ pageName, userLogged, props }) => {
            if (
                (isLogged && userLogged === 'logged') ||
                (!isLogged && userLogged === 'unlogged') ||
                userLogged === 'both'
            ) {
                this.navbarItems[pageName] = new NavbarLink(
                    this.htmlElement,
                    props,
                );

                if (pageName === activePageName) {
                    this.navbarItems[pageName].activate();
                }
            }
        });
        // this.navbarItems[activePageName].activate();
    }
}
