import { config } from './../../../shared/constants/config'

export class WithNavbar {
    constructor(parent) {
        this.parentElement = parent;
        this.pageItems = {};
        this.activeElement = null;
        this.navbarLinkElements = {};
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

        this.activeElement.classList.remove('active');
        this.activeElement = this.navbarLinkElements[pageName];
        this.activeElement.classList.add('active');

        this.pageItems[pageName].render();
    }

    render() {
        this.navbarElement = document.createElement('header');
        this.htmlElement = document.createElement('main');

        Object
            .keys(this.pageItems)
            .forEach((pageName, index) => {
                const menuItemElement = document.createElement('a');
                menuItemElement.href = config.menu[pageName].href;
                menuItemElement.textContent = config.menu[pageName].text;
                menuItemElement.dataset.section = pageName;

                if (index === 0) {
                    menuItemElement.classList.add('active');
                    this.activeElement = menuItemElement;
                }

                this.navbarElement.appendChild(menuItemElement);
                this.navbarLinkElements[pageName] = menuItemElement;
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