import './index.style.scss';
import sortCardTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { SortCardProps } from './index.types';

export class TextItem extends Component<HTMLDivElement, SortCardProps> {
    constructor(parent: Element, props: SortCardProps) {
        super(parent, sortCardTmpl, props);
    }

    get id() {
        return this.props.id;
    }

    get name() {
        return this.props.name;
    }

    protected render() {
        this.renderTemplate();
    }
}
