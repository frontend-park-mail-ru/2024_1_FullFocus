/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './style.scss';
import { config } from '@/shared/constants/config';
import { NavbarLink } from './navbarLink/navbarLink';
import withNavbarTmpl from './withNavbar.pug';
import { ajax } from '@/shared/api/ajax';

interface PageItems {
    [name: string]: any;
}

interface NavbarLinkItems {
    [name: string]: NavbarLink;
}

export class WithNavbar {
    parent: Element;
    pageItems: PageItems;
    activePageName: string;
    navbarLinkItems: NavbarLinkItems;
    navbarElement: Element;
    htmlElement: Element;
    isLoggedIn: boolean;
    activeItem: NavbarLink;

    /**
     * Constructor for WithNavbar object
     * @param {Element} parent - parent html element
     */
    constructor(parent: Element) {
        this.parent = parent;
        this.pageItems = {};
        this.activePageName = '';
        this.navbarLinkItems = {};
        this.navbarElement = null;
        this.htmlElement = null;
        this.isLoggedIn = false;
        this.activeItem = null;
    }

    /**
     * Adds page
     * @param {any} pageItem - page object
     */
    addPage(pageItem: any) {
        this.pageItems[pageItem.name] = pageItem;
    }

    /**
     * Change page
     * @param {string} pageName - name of the page to go
     */
    goToPage(pageName: string) {
        this.htmlElement.innerHTML = '';
        this.activePageName = pageName;
        this.updateNavbar();

        this.pageItems[pageName].render();
    }

    /**
     * Renders page with navbar
     */
    render() {
        this.parent.insertAdjacentHTML('beforeend', withNavbarTmpl());
        this.navbarElement =
            this.parent.getElementsByClassName('navbar__navigation')[0];
        this.htmlElement = this.parent.getElementsByClassName('content')[0];

        this.navbarElement.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLLinkElement;

            if (target.tagName.toLowerCase() === 'a') {
                e.preventDefault();

                this.goToPage(target.dataset.section);
            }
        });

        this.goToPage('login');
    }

    /**
     * Updates navbar
     */
    updateNavbar() {
        const p = ajax('GET', '/api/auth/check', null, null);

        p.then(({ Status }) => {
            this.navbarElement.innerHTML = '';
            this.isLoggedIn = Status === 200;

            Object.keys(this.pageItems).forEach((pageName) => {
                if (
                    (this.isLoggedIn &&
                        config.menu[pageName].userLogged === 'unlogged') ||
                    (!this.isLoggedIn &&
                        config.menu[pageName].userLogged === 'unlogged') ||
                    config.menu[pageName].userLogged === 'both'
                ) {
                    const navbarLinkItem = new NavbarLink(
                        this.navbarElement,
                        pageName,
                        config.menu[pageName].href,
                        config.menu[pageName].text,
                    );

                    navbarLinkItem.render();

                    if (pageName === this.activePageName) {
                        navbarLinkItem.activate();
                        this.activeItem = navbarLinkItem;
                    }

                    this.navbarLinkItems[pageName] = navbarLinkItem;
                }
            });
        }).catch((error) => console.log(error));
    }
}
