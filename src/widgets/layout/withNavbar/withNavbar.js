import { config } from './../../../shared/constants/config'
import { domFromHtml } from '../../../shared/lib/domFromHtml/domFromHtml';
import { NavbarLink } from './navbarLink/navbarLink';
import withNavbarTmpl from './withNavbar.pug'

export class WithNavbar {
    constructor(parent) {
        this.parentElement = parent;
        this.pageItems = {};
        this.activeItem = null;
        this.navbarLinkItems = {};
        this.navbarElement = null;
        this.htmlElement = null;
    }

    addPage(pageItem) {
        this.pageItems[pageItem.name] = pageItem;
    }

    addChild(element) {
        this.htmlElement.appendChild(element);
    }

    goToPage(pageName) {
        this.htmlElement.innerHTML = '';

        this.activeItem.deactivate();
        this.activeItem = this.navbarLinkItems[pageName];
        this.activeItem.activate();
        
        this.htmlElement.appendChild(this.pageItems[pageName].render());
    }

    render() {
        const element = domFromHtml(withNavbarTmpl());
        this.navbarElement = element.getElementsByTagName('header')[0];
        this.htmlElement = element.getElementsByTagName('main')[0];

        Object
            .keys(this.pageItems)
            .forEach((pageName, index) => {
                const navbarLinkItem = new NavbarLink(
                        this,
                        pageName,
                        config.menu[pageName].href,
                        config.menu[pageName].text
                    );
                const navbarLinkElement = navbarLinkItem.render();

                if (index === 0) {
                    navbarLinkItem.activate();
                    this.activeItem = navbarLinkItem;
                }

                this.navbarElement.appendChild(navbarLinkElement);
                this.navbarLinkItems[pageName] = navbarLinkItem;
            });
        
        this.navbarElement.addEventListener('click', (e) => {
            const { target } = e;

            if (target.tagName.toLowerCase() === 'a') {
                e.preventDefault();

                this.goToPage(target.dataset.section);
            }
        })

        this.parentElement.appendChild(this.navbarElement);
        this.parentElement.appendChild(this.htmlElement);
        this.goToPage('main');
    }
}