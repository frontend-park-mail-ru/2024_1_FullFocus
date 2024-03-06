import './style.css';
import { config } from './../../../shared/constants/config'
import { domFromHtml } from '../../../shared/lib/domFromHtml/domFromHtml';
import { NavbarLink } from './navbarLink/navbarLink';
import withNavbarTmpl from './withNavbar.pug'
import { ajax } from '../../../shared/api/ajax';

export class WithNavbar {
    constructor(parent) {
        this.parentElement = parent;
        this.pageItems = {};
        this.activeItem = null;
        this.navbarLinkItems = {};
        this.navbarElement = null;
        this.htmlElement = null;
        this.isLoggedIn = false;
    }

    addPage(pageItem) {
        this.pageItems[pageItem.name] = pageItem;
    }

    addChild(element) {
        this.htmlElement.appendChild(element);
    }

    goToPage(pageName) {
        this.htmlElement.innerHTML = '';

        this.updateNavbar();
        
        this.htmlElement.appendChild(this.pageItems[pageName].render());
    }

    render() {
        const element = domFromHtml(withNavbarTmpl());
        this.navbarElement = element.getElementsByClassName('navbar__navigation')[0];
        this.htmlElement = element.getElementsByClassName('content')[0];
        
        this.navbarElement.addEventListener('click', (e) => {
            const { target } = e;

            if (target.tagName.toLowerCase() === 'a') {
                e.preventDefault();

                this.goToPage(target.dataset.section);
            }
        })

       
        this.parentElement.appendChild(element.getElementsByClassName('navbar')[0]);
        this.parentElement.appendChild(this.htmlElement);
        this.goToPage('main');
    }

    updateNavbar() {
        ajax('GET', '/api/auth/check', null, null, (data, status) => {
            this.navbarElement.innerHTML = '';
            this.isLoggedIn = status === 200;
            var linksCount = 0;
    
            Object
                .keys(this.pageItems)
                .forEach((pageName) => {
                    if (config.menu[pageName].userLogged === this.isLoggedIn || config.menu[pageName].userLogged == null) {
                        const navbarLinkItem = new NavbarLink(
                                this,
                                pageName,
                                config.menu[pageName].href,
                                config.menu[pageName].text
                            );
                        
                        const navbarLinkElement = navbarLinkItem.render();
                        
                        if (linksCount === 0) {
                            navbarLinkItem.activate();
                            this.activeItem = navbarLinkItem;
                        }
                        
                        this.navbarElement.appendChild(navbarLinkElement);
                        this.navbarLinkItems[pageName] = navbarLinkItem;
    
                        linksCount++;
                    }
                });
        })
    }
}