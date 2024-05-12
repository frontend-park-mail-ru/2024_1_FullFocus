import './index.style.scss';
import badgeTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { BadgeProps } from './index.types';

export type { BadgeColor } from './index.types';

export class Badge extends Component<HTMLSpanElement, BadgeProps> {
    constructor(parent: Element, props: BadgeProps) {
        super(parent, badgeTmpl, props);
    }

    protected render() {
        this.props.width = this.props.width ?? 'auto';
        this.renderTemplate();
    }

    updateText(newText: string) {
        this.htmlElement.innerText = newText;
    }
}
