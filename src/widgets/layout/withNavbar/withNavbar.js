import './style.css';
import { config } from './../../../shared/constants/config';
import { domFromHtml } from '../../../shared/lib/domFromHtml/domFromHtml';
import { NavbarLink } from './navbarLink/navbarLink';
import withNavbarTmpl from './withNavbar.pug';
import { ajax } from '../../../shared/api/ajax';

export class WithNavbar {
    /**
     * Constructor for WithNavbar object
     * @param {htmlElement} parent - parent html element
     */
    constructor(parent) {
        this.parentElement = parent;
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
        this.htmlElement.appendChild(this.pageItems[pageName].render());
    }

    /**
     * Renders page with navbar
     */
    render() {
        const element = domFromHtml(withNavbarTmpl());
        this.navbarElement =
            element.getElementsByClassName('navbar__navigation')[0];
        this.htmlElement = element.getElementsByClassName('content')[0];

        this.navbarElement.addEventListener('click', (e) => {
            const { target } = e;

            if (target.tagName.toLowerCase() === 'a') {
                e.preventDefault();

                this.goToPage(target.dataset.section);
            }
        });

        this.parentElement.appendChild(
            element.getElementsByClassName('navbar')[0],
        );
        this.parentElement.appendChild(this.htmlElement);
        this.goToPage('main');
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
                        this,
                        pageName,
                        config.menu[pageName].href,
                        config.menu[pageName].text,
                    );

                    const navbarLinkElement = navbarLinkItem.render();

                    if (pageName === this.activePageName) {
                        navbarLinkItem.activate();
                        this.activeItem = navbarLinkItem;
                    }

                    this.navbarElement.appendChild(navbarLinkElement);
                    this.navbarLinkItems[pageName] = navbarLinkItem;
                }
            });
        });
    }
}
