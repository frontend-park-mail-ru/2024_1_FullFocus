import navbarTmplFunc from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { NavbarProps } from './index.types';
import { NavbarLink } from './navbarLink';
import { NavbarLinkProps } from './navbarLink';
import { useCheckUserLogin } from '@/features/auth';
import { UserLogged } from './index.types';

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
        useCheckUserLogin()
            .then((isLogged) => {
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
            })
            .catch(() => {});
    }
}
