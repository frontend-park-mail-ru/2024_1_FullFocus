import './index.style.scss';
import navbarTmplFunc from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileNavbarProps } from './index.types';
import { Link, LinkProps } from '@/shared/uikit/link';
import { Button } from '@/shared/uikit/button';
import { useLogoutUser } from '@/features/auth';

export class ProfileNavbar extends Component<
    HTMLDivElement,
    ProfileNavbarProps
> {
    protected linkProps: {
        [pageName: string]: LinkProps;
    };
    protected activePage: string;
    protected navbarItems: { [name: string]: Link };
    protected logoutBtn: Button;

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
        const navbar = this.htmlElement.getElementsByClassName(
            'profile-navbar__links',
        )[0];
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

    protected componentDidMount() {
        this.logoutBtn.htmlElement.addEventListener('click', () => {
            useLogoutUser()
                .then(() => {
                    this.props.navigateToMain();
                })
                .catch(() => {});
        });
    }

    protected render() {
        this.renderTemplate();

        this.logoutBtn = new Button(this.htmlElement, {
            className: 'logout-btn',
            type: 'button',
            btnText: 'Выйти',
            btnStyle: 'red',
        });

        this.componentDidMount();
    }
}
