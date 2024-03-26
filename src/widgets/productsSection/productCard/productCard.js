import './style.css';
import { domFromHtml } from '../../../shared/lib/domFromHtml/domFromHtml';
import productItemTmpl from './productCard.pug';

export class ProductCard {
    /**
     * Constructor for ProductCard
     * @param {HTMLElement} parent - parent object
     * @param {string} name - product name
     * @param {number} price - product price
     * @param {string} imgLink - link to the product image
     */
    constructor(parent, name, price, imgLink) {
        this.parent = parent;
        this.name = name;
        this.price = price;
        this.imgLink = imgLink;
    }

    /**
     * Renders product card
     */
    render() {
        this.parent.insertAdjacentHTML(
            'beforeend',
            productItemTmpl({
                src: this.imgLink,
                name: this.name,
                price: this.price,
            }),
        );
    }
}
