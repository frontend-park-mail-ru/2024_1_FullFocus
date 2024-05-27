import './index.style.scss';
import linkTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { LinkProps } from './index.types';

export type { LinkProps, LinkStyle } from './index.types';

export class Link extends Component<HTMLLinkElement, LinkProps> {
    /**
     * Constructor for NavbarLink
     * @param {Element} parent - parent html element
     */
    constructor(parent: Element, props: LinkProps) {
        super(parent, linkTmpl, props);
    }

    set href(href: string) {
        this.props.href = href;
        this.htmlElement.href = href;
    }

    set text(text: string) {
        this.props.text = text;
        this.htmlElement.innerText = text;
    }

    /**
     * Activates navbar link
     */
    activate() {
        this.htmlElement.classList.add('link_active');
    }

    /**
     * Deactivate navbar link
     */
    deactivate() {
        this.htmlElement.classList.remove('link_active');
    }

    protected render(): void {
        this.props.iconOnly = this.props.iconOnly ?? false;
        this.props.href = this.props.href ?? '#';
        this.props.direction = this.props.direction ?? 'horizontal';
        this.props.textSize = this.props.textSize ?? 'text';

        this.renderTemplate();

        if (this.props.iconTmpl) {
            this.htmlElement
                .getElementsByClassName('link-with-icon__icon')[0]
                .insertAdjacentHTML('beforeend', this.props.iconTmpl());
        }
    }
}
