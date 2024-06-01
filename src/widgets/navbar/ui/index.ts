import './index.style.scss';
import navbarTmplFunc from './index.template.pug';
import './logo.png';
import { Component } from '@/shared/@types/index.component';
import { NavbarProps } from './index.types';
import { Link, LinkProps } from '@/shared/uikit/link';
import { UserLogged } from './index.types';
import { SearchBar } from './searchBar';
import {
    WithBadge,
    withCenterRightBadge,
    withTopRightBadge,
} from '@/shared/uikit/badge';
import { DropDown } from '@/shared/uikit/dropdown';

export type { UserLogged } from './index.types';

export class Navbar extends Component<HTMLDivElement, NavbarProps> {
    protected activeItemName: string;
    protected overlay: HTMLDivElement;
    protected publicLinkProps: Array<{
        pageName: string;
        badgeText?: string;
        props: LinkProps;
        children?: { href: string; text: string; name: string }[];
    }>;
    protected privateLinkProps: Array<{
        pageName: string;
        needsLogin: boolean;
        badgeText?: string;
        props: LinkProps;
        children?: { href: string; text: string; name: string }[];
    }>;
    protected navbarItems: {
        [name: string]: {
            link: WithBadge<Link>;
            dropdown?: DropDown<WithBadge<Link>>;
        };
    };
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
        children?: { href: string; text: string; name: string }[],
    ) {
        if (userLogged === 'both') {
            this.publicLinkProps.push({
                pageName: pageName,
                props: props,
                badgeText: badgeText,
                children: children,
            });
            this.publicLayoutChanged = true;
        }

        if (userLogged !== 'both') {
            this.privateLinkProps.push({
                pageName: pageName,
                props: props,
                badgeText: badgeText,
                needsLogin: userLogged === 'logged',
                children: children,
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
                this.navbarItems[this.activeItemName].link.inner.deactivate();
            }
            this.navbarItems[activePageName].link.inner.activate();
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
        this.publicLinkProps.forEach(
            ({ pageName, props, badgeText, children }) => {
                this.navbarItems[pageName] = {
                    link: withTopRightBadge(
                        (parent: Element) => {
                            return new Link(parent, props);
                        },
                        this.publicLinksElement,
                        'container-' +
                            props.className +
                            (children !== undefined
                                ? ' navbar-link-with-children'
                                : ''),
                        badgeText,
                    ),
                };

                if (children) {
                    this.renderChildren(pageName, props.className, children);
                }
            },
        );
    }

    protected renderPrivate(isLogged: boolean) {
        this.privateLinksElement.innerHTML = '';
        this.privateLinkProps.forEach(
            ({ pageName, needsLogin, props, badgeText, children }) => {
                if (needsLogin === isLogged) {
                    this.navbarItems[pageName] = {
                        link: withTopRightBadge(
                            (parent: Element) => {
                                return new Link(parent, props);
                            },
                            this.privateLinksElement,
                            'container-' +
                                props.className +
                                (children !== undefined
                                    ? ' navbar-link-with-children'
                                    : ''),
                            badgeText,
                        ),
                    };

                    if (children) {
                        this.renderChildren(
                            pageName,
                            props.className,
                            children,
                        );
                    }
                }
            },
        );
    }

    protected renderChildren(
        pageName: string,
        className: string,
        children: {
            href: string;
            text: string;
            name: string;
        }[],
    ) {
        this.navbarItems[pageName].dropdown = new DropDown<WithBadge<Link>>(
            this.navbarItems[pageName].link.htmlElement,
            {
                className: 'navbar-dropdown dropdown-' + className,
                size: 'xs',
                togglerPlace: 'right',
            },
        );

        children.forEach(({ href, text, name }) => {
            this.navbarItems[pageName].dropdown.addItem((parent: Element) => {
                return {
                    id: name,
                    item: withCenterRightBadge(
                        (parent: Element) => {
                            return new Link(parent, {
                                className: 'link-navbar-dropdown',
                                style: 'no-style',
                                href: href,
                                text: text,
                            });
                        },
                        parent,
                        'container-' + name,
                        undefined,
                    ),
                };
            });
        });

        this.navbarItems[pageName].link.htmlElement.addEventListener(
            'mouseenter',
            () => {
                this.navbarItems[pageName].dropdown.show();
            },
        );

        this.navbarItems[pageName].link.htmlElement.addEventListener(
            'mouseleave',
            () => {
                this.navbarItems[pageName].dropdown.hide();
            },
        );
    }

    hide() {
        this.htmlElement.hidden = true;
    }

    show() {
        this.htmlElement.hidden = false;
    }

    updateBadge(pageName: string, badgeText: string, childName?: string) {
        if (pageName in this.navbarItems) {
            if (childName) {
                this.navbarItems[pageName].dropdown
                    .itemById(childName)
                    .updateBadge(badgeText);
            }

            if (!childName) {
                this.navbarItems[pageName].link.updateBadge(badgeText);
            }
        }
    }

    hideBadge(pageName: string, childName?: string) {
        if (pageName in this.navbarItems) {
            if (childName) {
                this.navbarItems[pageName].dropdown
                    .itemById(childName)
                    .hideBadge();
            }

            if (!childName) {
                this.navbarItems[pageName].link.hideBadge();
            }
        }
    }

    showBadge(pageName: string, childName?: string) {
        if (pageName in this.navbarItems) {
            if (childName) {
                this.navbarItems[pageName].dropdown
                    .itemById(childName)
                    .showBadge();
            }

            if (!childName) {
                this.navbarItems[pageName].link.showBadge();
            }
        }
    }
}
