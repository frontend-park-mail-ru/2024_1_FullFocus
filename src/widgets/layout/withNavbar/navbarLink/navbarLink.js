import './style.css';
import navbarLinkTmpl from './navbarLink.pug';

export class NavbarLink {
    /**
     * Constructor for NavbarLink
     * @param {HTMLElement} parent - parent html element
     * @param {string} section - associated with navbar link page name
     * @param {string} href - href html link attribute
     * @param {string} text - navbar link text
     */
    constructor(parent, section, href, text) {
        this.parent = parent;
        this.href = href;
        this.section = section;
        this.text = text;
        this.htmlElement = null;
    }

    /**
     * Renders NavbarLink
     * @returns {HTMLElement} rendered html element
     */
    render() {
        this.parent.insertAdjacentHTML(
            'beforeend',
            navbarLinkTmpl({
                href: this.href,
                section: this.section,
                text: this.text,
            }),
        );

        this.htmlElement = this.parent.getElementsByClassName(
            'navigation-link-' + this.section,
        )[0];
    }

    /**
     * Activates navbar link
     */
    activate() {
        this.htmlElement.classList.add('navigation-link_active');
    }

    /**
     * Deactivate navbar link
     */
    deactivate() {
        this.htmlElement.classList.remove('navigation-link_active');
    }
}
