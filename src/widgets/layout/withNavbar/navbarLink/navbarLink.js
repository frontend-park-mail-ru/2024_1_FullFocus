import navbarLinkTmpl from './navbarLink.pug'
import { domFromHtml } from '../../../../shared/lib/domFromHtml/domFromHtml';

export class NavbarLink {
    constructor(parent, section, href, text) {
        this.parentItem = parent;
        this.href = href;
        this.section = section;
        this.text = text;
        this.element = null;
    }

    render() {
        const component = navbarLinkTmpl({
                href: this.href,
                section: this.section,
                text: this.text
            });
        this.element = domFromHtml(component);
        return this.element;
    }

    activate() {
        this.element.classList.add('active');
    }
    
    deactivate() {
        this.element.classList.remove('active');
    }
}

