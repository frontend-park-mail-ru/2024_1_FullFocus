import './index.style.scss';
import separatorTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { SeparatorProps } from './index.types';

export class Separator extends Component<HTMLDivElement, SeparatorProps> {
    constructor(parent: Element, props: SeparatorProps) {
        super(parent, separatorTmpl, props);
    }

    protected render() {
        this.props.text = this.props.text ?? '';
        this.renderTemplate();
        if (this.props.marginTop) {
            this.htmlElement.style.marginTop = this.props.marginTop;
        }
    }
}
