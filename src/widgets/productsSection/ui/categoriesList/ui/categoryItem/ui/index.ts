import './index.style.scss';
import navbarLinkTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { LinkProps } from './index.types';

export { LinkProps } from './index.types';

export class Link extends Component<HTMLLinkElement, LinkProps> {
    /**
     * Constructor for NavbarLink
     * @param {Element} parent - parent html element
     */
    constructor(parent: Element, props: LinkProps) {
        super(parent, navbarLinkTmpl, props);
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
