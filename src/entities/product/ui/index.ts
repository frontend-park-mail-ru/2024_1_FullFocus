import './style.scss';
import productItemTmpl from './template.pug';
import { IProduct } from '../model';
import { Component } from '@/shared/@types/component';
import { ProductProps } from './types';

export class ProductCard extends Component<HTMLDivElement, ProductProps> {
    productInfo: IProduct;

    /**
     * Constructor for ProductCard
     * @param {Element} parent - parent object
     */
    constructor(parent: Element, productInfo: IProduct) {
        super(parent, productItemTmpl, {
            className: `product-${productInfo.name}`,
            src: productInfo.imgLink,
            name: productInfo.name,
            price: productInfo.price,
        });

        this.productInfo = productInfo;
    }
}
