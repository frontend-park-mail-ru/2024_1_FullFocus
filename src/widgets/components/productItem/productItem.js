import productItemTmpl from './productItem.pug'

export class ProductItem {
    constructor(parent, name, cost) {
        this.parentItem = parent;
        this.name = name;
        this.cost = cost;
    }

    render() {
        const component = productItemTmpl({productName: this.name, productCost: this.cost});
        this.parentItem.htmlElement.insertAdjacentHTML('beforeend', component);
    }
}
