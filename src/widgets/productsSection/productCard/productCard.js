import Mock from './image.png'
import { domFromHtml } from '../../../shared/lib/domFromHtml/domFromHtml';
import productItemTmpl from './productCard.pug'

export class ProductCard {
    constructor(parent, name, price) {
        this.parentItem = parent;
        this.name = name;
        this.price = price;
    }

    render() {
        const component = productItemTmpl({src: Mock, name: this.name, price: this.price});
        return domFromHtml(component);
    }
}
