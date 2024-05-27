import './index.style.scss';
import navbarTmplFunc from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileNavbarProps } from './index.types';
import { Link, LinkProps } from '@/shared/uikit/link';
import { Button } from '@/shared/uikit/button';
import { useLogoutUser } from '@/features/auth';
import { WithBadge, withTopRightBadge } from '@/shared/uikit/badge';

export class ProfileNavbar extends Component<
    HTMLDivElement,
    ProfileNavbarProps
> {
    protected linkProps: {
        [pageName: string]: { props: LinkProps; badgeText: string };
    };
    protected activePage: string;
    protected navbarItems: { [name: string]: WithBadge<Link> };
    protected logoutBtn: Button;

    constructor(parent: Element, props: ProfileNavbarProps) {
        super(parent, navbarTmplFunc, props);
        this.linkProps = {};
        this.navbarItems = {};
        this.activePage = undefined;
    }

    addLink(pageName: string, props: LinkProps, badgeText?: string) {
        this.linkProps[pageName] = {
            props: props,
            badgeText: badgeText,
        };
    }

    updateNavbar() {
        const navbar = this.htmlElement.getElementsByClassName(
            'profile-navbar__links',
        )[0];
        Object.entries(this.linkProps).forEach(
            ([name, { props, badgeText }]) => {
                this.navbarItems[name] = withTopRightBadge(
                    (parent: Element) => {
                        return new Link(parent, props);
                    },
                    navbar,
                    'container-' + props.className,
                    badgeText,
                );
            },
        );
    }

    updateBadge(pageName: string, badgeText: string) {
        if (pageName in this.navbarItems) {
            this.navbarItems[pageName].updateBadge(badgeText);
        }
    }

    hideBadge(pageName: string) {
        if (pageName in this.navbarItems) {
            this.navbarItems[pageName].hideBadge();
        }
    }

    showBadge(pageName: string) {
        if (pageName in this.navbarItems) {
            this.navbarItems[pageName].showBadge();
        }
    }

    changeActiveItem(activePageName: string) {
        if (activePageName in this.navbarItems) {
            if (this.activePage != undefined) {
                this.navbarItems[this.activePage].inner.deactivate();
            }

            this.activePage = activePageName;
            this.navbarItems[this.activePage].inner.activate();
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
