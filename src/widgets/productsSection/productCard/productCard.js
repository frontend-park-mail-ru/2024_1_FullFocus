import './style.css';
import { domFromHtml } from '../../../shared/lib/domFromHtml/domFromHtml';
import productItemTmpl from './productCard.pug'

export class ProductCard {
    constructor(parent, name, price, imgLink) {
        this.parentItem = parent;
        this.name = name;
        this.price = price;
        this.imgLink = imgLink;
    }

    render() {
        const component = productItemTmpl({src: this.imgLink, name: this.name, price: this.price});
        return domFromHtml(component);
    }
}
