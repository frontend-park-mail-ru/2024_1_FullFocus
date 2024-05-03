import './index.style.scss';
import navbarTmplFunc from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileNavbarProps } from './index.types';
import { Link, LinkProps } from '@/shared/uikit/link';

export class ProfileNavbar extends Component<
    HTMLDivElement,
    ProfileNavbarProps
> {
    protected linkProps: {
        [pageName: string]: LinkProps;
    };
    protected activePage: string;
    protected navbarItems: { [name: string]: Link };

    constructor(parent: Element, props: ProfileNavbarProps) {
        super(parent, navbarTmplFunc, props);
        this.linkProps = {};
        this.navbarItems = {};
        this.activePage = undefined;
    }

    addLink(pageName: string, props: LinkProps) {
        this.linkProps[pageName] = props;
    }

    updateNavbar() {
        const navbar =
            this.htmlElement.getElementsByClassName('profile-navbar')[0];
        Object.entries(this.linkProps).forEach(([name, props]) => {
            this.navbarItems[name] = new Link(navbar, props);
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
