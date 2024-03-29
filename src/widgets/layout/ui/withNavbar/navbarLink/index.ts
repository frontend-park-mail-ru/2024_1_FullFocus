import './style.scss';
import navbarLinkTmpl from './template.pug';
import { Component } from '@/shared/@types/component';
import { NavbarLinkProps } from './types';

export class NavbarLink extends Component<HTMLLinkElement, NavbarLinkProps> {
    /**
     * Constructor for NavbarLink
     * @param {Element} parent - parent html element
     */
    constructor(parent: Element, props: NavbarLinkProps) {
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
