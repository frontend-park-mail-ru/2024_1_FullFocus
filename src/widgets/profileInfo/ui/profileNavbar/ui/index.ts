import './index.style.scss';
import navbarTmplFunc from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileNavbarProps } from './index.types';
import { ProfileNavbarLink, ProfileNavbarLinkProps } from './profileNavbarLink';

export class ProfileNavbar extends Component<
    HTMLDivElement,
    ProfileNavbarProps
> {
    protected linkProps: Array<{
        pageName: string;
        props: ProfileNavbarLinkProps;
    }>;
    protected activePage: string;
    protected navbarItems: { [name: string]: ProfileNavbarLink };

    constructor(parent: Element, props: ProfileNavbarProps) {
        super(parent, navbarTmplFunc, props);
        this.linkProps = [];
        this.navbarItems = {};
        this.activePage = undefined;
    }

    addLink(pageName: string, props: ProfileNavbarLinkProps) {
        this.linkProps.push({
            pageName: pageName,
            props: props,
        });
    }

    updateNavbar() {
        Object.entries(this.linkProps).forEach(([name, props]) => {
            this.navbarItems[name] = new ProfileNavbarLink(
                this.htmlElement,
                props.props,
            );
        });
    }

    changeActiveItem(activePageName: string) {
        if (activePageName in this.navbarItems) {
            if (this.activePage != undefined) {
                this.navbarItems[this.activePage].deactivate();
            }

            this.activePage = activePageName;
            this.navbarItems[this.activePage].activate();
        }
    }
}
