import { ProductsSection } from '../../widgets/productsSection/productsSection';

export class Main {
    /**
     * Constructor for Main page object
     * @param {any} parent - parent object
     * @param {string} name - name of the page
     */
    constructor(parent, name) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
    }

    /**
     * Renders main page
     * @returns {HTMLElement} html element of the page
     */
    render() {
        const productsSection = new ProductsSection(
            this.parentItem.htmlElement,
            'Популярные товары',
        );

        productsSection.render();
        this.htmlElement = productsSection.htmlElement;
    }
}
