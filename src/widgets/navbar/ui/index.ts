import navbarTmplFunc from './template.pug';
import { Component } from '@/shared/@types/component';
import { NavbarProps } from './types';
import { NavbarLink } from './navbarLink';
import { NavbarLinkProps } from './navbarLink/types';
import { isUserLogged } from '@/features/auth';
import { UserLogged } from './types';

export class Navbar extends Component<HTMLDivElement, NavbarProps> {
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
    }

    addLink(pageName: string, userLogged: UserLogged, props: NavbarLinkProps) {
        this.linkProps.push({
            pageName: pageName,
            userLogged: userLogged,
            props: props,
        });
    }

    updateNavbar(activePageName: string) {
        isUserLogged()
            .then((isLogged) => {
                this.htmlElement.innerHTML = '';
                this.linkProps.forEach(({ pageName, userLogged, props }) => {
                    if (
                        (isLogged && userLogged === 'unlogged') ||
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
            })
            .catch(() => {});
    }
}
