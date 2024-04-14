import './index.style.scss';
import navbarTmplFunc from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { NavbarProps } from './index.types';
import { NavbarLink } from './navbarLink';
import { NavbarLinkProps } from './navbarLink';
import { UserLogged } from './index.types';

export { UserLogged } from './index.types';

export class Navbar extends Component<HTMLDivElement, NavbarProps> {
    protected activeItemName: string;
    protected publicLinkProps: Array<{
        pageName: string;
        props: NavbarLinkProps;
    }>;
    protected privateLinkProps: Array<{
        pageName: string;
        needsLogin: boolean;
        props: NavbarLinkProps;
    }>;
    protected navbarItems: { [name: string]: NavbarLink };
    protected isUserLogged: boolean;
    protected publicLayoutChanged: boolean;
    protected privateLayoutChanged: boolean;
    protected publicLinksElement: Element;
    protected privateLinksElement: Element;

    constructor(parent: Element, props: NavbarProps) {
        super(parent, navbarTmplFunc, props);
        this.activeItemName = undefined;
        this.publicLinkProps = [];
        this.privateLinkProps = [];
        this.navbarItems = {};
        this.isUserLogged = false;
        this.publicLayoutChanged = false;
        this.privateLayoutChanged = false;
    }

    addLink(pageName: string, userLogged: UserLogged, props: NavbarLinkProps) {
        if (userLogged === 'both') {
            this.publicLinkProps.push({
                pageName: pageName,
                props: props,
            });
            this.publicLayoutChanged = true;
        }

        if (userLogged !== 'both') {
            this.privateLinkProps.push({
                pageName: pageName,
                props: props,
                needsLogin: userLogged === 'logged',
            });
            this.privateLayoutChanged = true;
        }
    }

    updateNavbar(activePageName: string, isLogged: boolean) {
        if (this.activeItemName) {
            this.navbarItems[this.activeItemName].deactivate();
        }

        if (this.publicLayoutChanged) {
            this.publicLinksElement.innerHTML = '';
            this.renderPublic();
            this.publicLayoutChanged = false;
        }

        if (this.privateLayoutChanged || this.isUserLogged !== isLogged) {
            this.privateLinksElement.innerHTML = '';
            this.renderPrivate(isLogged);
            this.privateLayoutChanged = false;
            this.isUserLogged = isLogged;
        }

        this.navbarItems[activePageName].activate();
        this.activeItemName = activePageName;
    }

    protected render() {
        this.renderTemplate();

        this.publicLinksElement =
            this.htmlElement.getElementsByClassName('navbar__public')[0];

        this.privateLinksElement =
            this.htmlElement.getElementsByClassName('navbar__private')[0];
    }

    protected renderPublic() {
        this.publicLinksElement.innerHTML = '';
        this.publicLinkProps.forEach(({ pageName, props }) => {
            this.navbarItems[pageName] = new NavbarLink(
                this.publicLinksElement,
                props,
            );
        });
    }

    protected renderPrivate(isLogged: boolean) {
        this.privateLinksElement.innerHTML = '';
        this.privateLinkProps.forEach(({ pageName, needsLogin, props }) => {
            if (needsLogin === isLogged) {
                this.navbarItems[pageName] = new NavbarLink(
                    this.privateLinksElement,
                    props,
                );
            }
        });
    }
}
