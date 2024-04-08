import './index.style.scss';
import orderCardTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { OrderCardProps } from './index.types';

export class OrderCard extends Component<HTMLDivElement, OrderCardProps> {
    constructor(parent: Element, props: OrderCardProps) {
        super(parent, orderCardTmpl, props);
    }

    protected render() {
        this.renderTemplate();
    }
}
