import { ProductsSection } from "../../widgets/components/productsSection/productsSection";

export class Main {
    constructor(parent, name) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
    }

    render() {
        const productsSection = new ProductsSection();
        this.htmlElement = productsSection.render();
        return this.htmlElement;
    }
}