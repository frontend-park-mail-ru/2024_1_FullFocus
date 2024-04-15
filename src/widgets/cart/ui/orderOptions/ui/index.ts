import './index.style.scss';
import cartItemsSectionTempl from './index.template.pug';
import { OrderOptionsProps } from './index.types';
import { Component } from '@/shared/@types/index.component';

export class OrderOptions extends Component<HTMLDivElement, OrderOptionsProps> {
    /**
     * Constructor for ProductsSection
     * @param {Element} parent - parent html element
     */
    constructor(parent: Element, props: OrderOptionsProps) {
        super(parent, cartItemsSectionTempl, props);
    }

    /**
     * Renders products section
     */
    protected render() {
        this.renderTemplate();
    }
}
