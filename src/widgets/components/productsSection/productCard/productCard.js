import Mock from './image.png'
import { domFromHtml } from '../../../../shared/lib/domFromHtml/domFromHtml';
import productItemTmpl from './productCard.pug'

export class ProductCard {
    constructor(parent, name, cost) {
        this.parentItem = parent;
        this.name = name;
        this.cost = cost;
    }

    render() {
        const component = productItemTmpl({src: Mock, productName: this.name, productCost: this.cost});
        return domFromHtml(component);
    }
}
