import { ProductsSection } from "../../widgets/productsSection/productsSection";

export class Main {
    constructor(parent, name) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
    }

    render() {
        const productsSection = new ProductsSection('Популярные товары');
        this.htmlElement = productsSection.render();
        return this.htmlElement;
    }
}