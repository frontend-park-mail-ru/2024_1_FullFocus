import './index.style.scss';
import productItemTmpl from './index.template.pug';
import { IProduct } from '../model';
import { Component } from '@/shared/@types/index.component';
import { ProductProps } from './index.types';

export class ProductCard extends Component<HTMLDivElement, ProductProps> {
    productInfo: IProduct;

    /**
     * Constructor for ProductCard
     * @param {Element} parent - parent object
     */
    constructor(parent: Element, props: ProductProps) {
        super(parent, productItemTmpl, props);
    }

    protected render() {
        this.renderTemplate();
    }

    get price() {
        return this.props.price;
    }

    get id() {
        return this.props.id;
    }
}
