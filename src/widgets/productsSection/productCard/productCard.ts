import './style.scss';
import productItemTmpl from './productCard.pug';

export class ProductCard {
    parent: Element;
    name: string;
    price: number;
    imgLink: string;
    htmlElement: HTMLDivElement;

    /**
     * Constructor for ProductCard
     * @param {Element} parent - parent object
     * @param {string} name - product name
     * @param {number} price - product price
     * @param {string} imgLink - link to the product image
     */
    constructor(parent: Element, name: string, price: number, imgLink: string) {
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
