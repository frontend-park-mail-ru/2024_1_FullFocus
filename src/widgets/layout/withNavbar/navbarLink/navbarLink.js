import './style.css'
import navbarLinkTmpl from './navbarLink.pug'
import { domFromHtml } from '../../../../shared/lib/domFromHtml/domFromHtml';

export class NavbarLink {
    /**
     * Constructor for NavbarLink
     * @param {any} parent - parent object
     * @param {string} section - associated with navbar link page name
     * @param {string} href - href html link attribute
     * @param {string} text - navbar link text
     */
    constructor(parent, section, href, text) {
        this.parentItem = parent;
        this.href = href;
        this.section = section;
        this.text = text;
        this.element = null;
    }

    /**
     * Renders NavbarLink
     * @returns {HTMLElement} rendered html element
     */
    render() {
        const component = navbarLinkTmpl({
                href: this.href,
                section: this.section,
                text: this.text
            });
        this.element = domFromHtml(component);
        return this.element;
    }

    /**
     * Activates navbar link
     */
    activate() {
        this.element.classList.add('active');
    }
    
    /**
     * Deactivate navbar link
     */
    deactivate() {
        this.element.classList.remove('active');
    }
}

