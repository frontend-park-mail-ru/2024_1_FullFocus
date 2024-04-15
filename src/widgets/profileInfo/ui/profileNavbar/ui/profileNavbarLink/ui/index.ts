import './index.style.scss';
import navbarLinkTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileNavbarLinkProps } from './index.types';

export type { ProfileNavbarLinkProps } from './index.types';

export class ProfileNavbarLink extends Component<
    HTMLLinkElement,
    ProfileNavbarLinkProps
> {
    /**
     * Constructor for NavbarLink
     * @param {Element} parent - parent html element
     */
    constructor(parent: Element, props: ProfileNavbarLinkProps) {
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
