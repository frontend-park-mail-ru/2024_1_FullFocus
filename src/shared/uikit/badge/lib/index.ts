import withTopRight from './index.template.pug';
import './index.style.scss';
import { Component } from '@/shared/@types/index.component';
import { WithBadgeProps } from './index.types';
import { Badge } from '../ui';

export class WithBadge<
    InnerElement extends Component<Element> = Component<Element>,
> extends Component<HTMLSpanElement, WithBadgeProps<InnerElement>> {
    protected innerComponent: InnerElement;
    protected badge: Badge;

    constructor(parent: Element, props: WithBadgeProps<InnerElement>) {
        super(parent, withTopRight, props);
    }

    protected render() {
        this.renderTemplate();
        this.innerComponent = this.props.elementToBadge(this.htmlElement);

        if (this.props.badgeText) {
            this.badge = new Badge(this.htmlElement, {
                className: 'with-top-right__badge',
                color: 'red',
                text: this.props.badgeText,
                position: 'top-right',
            });
        }
    }

    updateBadge(badgeText: string) {
        if (!this.badge) {
            this.badge = new Badge(this.htmlElement, {
                className: 'with-top-right__badge',
                color: 'red',
                text: this.props.badgeText,
                position: 'top-right',
            });
        }

        this.badge.updateText(badgeText);
    }

    hideBadge() {
        if (this.badge) {
            this.badge.htmlElement.hidden = true;
        }
    }

    showBadge() {
        if (this.badge) {
            this.badge.htmlElement.hidden = false;
        }
    }

    get inner() {
        return this.innerComponent;
    }
}

export function withTopRightBadge<
    InnerElement extends Component<Element> = Component<Element>,
>(
    element: (parent: Element) => InnerElement,
    parent: Element,
    className: string,
    badgeText: string,
) {
    return new WithBadge<InnerElement>(parent, {
        className: className,
        elementToBadge: element,
        badgeText: badgeText,
    });
}
