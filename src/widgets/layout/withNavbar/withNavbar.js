import './style.css';
import { config } from './../../../shared/constants/config';
import { NavbarLink } from './navbarLink/navbarLink';
import withNavbarTmpl from './withNavbar.pug';
import { ajax } from '../../../shared/api/ajax';

export class WithNavbar {
    /**
     * Constructor for WithNavbar object
     * @param {HTMLElement} parent - parent html element
     */
    constructor(parent) {
        this.parent = parent;
        this.pageItems = {};
        this.activePageName = '';
        this.navbarLinkItems = {};
        this.navbarElement = null;
        this.htmlElement = null;
        this.isLoggedIn = false;
    }

    /**
     * Adds page
     * @param {any} pageItem - page object
     */
    addPage(pageItem) {
        this.pageItems[pageItem.name] = pageItem;
    }

    /**
     * Change page
     * @param {string} pageName - name of the page to go
     */
    goToPage(pageName) {
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

        this.navbarElement.addEventListener('click', (e) => {
            const { target } = e;

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
        ajax('GET', '/api/auth/check', null, null, (data, status) => {
            this.navbarElement.innerHTML = '';
            this.isLoggedIn = status === 200;

            Object.keys(this.pageItems).forEach((pageName) => {
                if (
                    config.menu[pageName].userLogged === this.isLoggedIn ||
                    config.menu[pageName].userLogged == null
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
        });
    }
}
