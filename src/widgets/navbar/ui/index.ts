import './index.style.scss';
import navbarTmplFunc from './index.template.pug';
import './logo.png';
import { Component } from '@/shared/@types/index.component';
import { NavbarProps } from './index.types';
import { Link, LinkProps } from '@/shared/uikit/link';
import { UserLogged } from './index.types';
import { SearchBar } from './searchBar';
import { WithBadge, withTopRightBadge } from '@/shared/uikit/badge';

export type { UserLogged } from './index.types';

export class Navbar extends Component<HTMLDivElement, NavbarProps> {
    protected activeItemName: string;
    protected overlay: HTMLDivElement;
    protected publicLinkProps: Array<{
        pageName: string;
        badgeText?: string;
        props: LinkProps;
    }>;
    protected privateLinkProps: Array<{
        pageName: string;
        needsLogin: boolean;
        badgeText?: string;
        props: LinkProps;
    }>;
    protected navbarItems: { [name: string]: WithBadge<Link> };
    protected searchBar: SearchBar;
    protected isUserLogged: boolean;
    protected publicLayoutChanged: boolean;
    protected privateLayoutChanged: boolean;
    protected publicLinksElement: Element;
    protected searchBarElement: Element;
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

    addLink(
        pageName: string,
        userLogged: UserLogged,
        props: LinkProps,
        badgeText?: string,
    ) {
        if (userLogged === 'both') {
            this.publicLinkProps.push({
                pageName: pageName,
                props: props,
                badgeText: badgeText,
            });
            this.publicLayoutChanged = true;
        }

        if (userLogged !== 'both') {
            this.privateLinkProps.push({
                pageName: pageName,
                props: props,
                badgeText: badgeText,
                needsLogin: userLogged === 'logged',
            });
            this.privateLayoutChanged = true;
        }
    }

    updateNavbar(activePageName: string, isLogged: boolean) {
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

        if (activePageName in this.navbarItems) {
            if (this.activeItemName) {
                this.navbarItems[this.activeItemName].inner.deactivate();
            }
            this.navbarItems[activePageName].inner.activate();
            this.activeItemName = activePageName;
        }
    }

    protected render() {
        this.props.withSearch = this.props.withSearch ?? true;
        this.props.type = this.props.type ?? 'desktop';

        this.renderTemplate();

        this.publicLinksElement =
            this.htmlElement.getElementsByClassName('navbar__public')[0];

        this.searchBarElement = this.htmlElement.getElementsByClassName(
            'navbar__searchbar-container',
        )[0];

        this.privateLinksElement =
            this.htmlElement.getElementsByClassName('navbar__private')[0];

        this.renderSearchBar();
    }

    protected renderSearchBar() {
        if (!this.props.withSearch) {
            return;
        }

        if (this.searchBar) {
            this.searchBar.destroy();
        }

        this.searchBar = new SearchBar(this.searchBarElement, {
            className: 'navbar__searchbar',
            navigateCategoryPage: this.props.navigateCategoryPage,
            navigateSearchPage: this.props.navigateSearchPage,
        });
    }

    protected renderPublic() {
        this.publicLinksElement.innerHTML = '';
        this.publicLinkProps.forEach(({ pageName, props, badgeText }) => {
            this.navbarItems[pageName] = withTopRightBadge(
                (parent: Element) => {
                    return new Link(parent, props);
                },
                this.publicLinksElement,
                'container-' + props.className,
                badgeText,
            );
        });
    }

    protected renderPrivate(isLogged: boolean) {
        this.privateLinksElement.innerHTML = '';
        this.privateLinkProps.forEach(
            ({ pageName, needsLogin, props, badgeText }) => {
                if (needsLogin === isLogged) {
                    this.navbarItems[pageName] = withTopRightBadge(
                        (parent: Element) => {
                            return new Link(parent, props);
                        },
                        this.privateLinksElement,
                        'container-' + props.className,
                        badgeText,
                    );
                }
            },
        );
    }

    hide() {
        this.htmlElement.hidden = true;
    }

    show() {
        this.htmlElement.hidden = false;
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
}
