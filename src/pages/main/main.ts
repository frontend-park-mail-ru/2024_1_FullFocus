import { WithNavbar } from '@/widgets/layout/withNavbar/withNavbar';
import { ProductsSection } from '@/widgets/productsSection/productsSection';

export class Main {
    parentItem: WithNavbar;
    name: string;
    htmlElement: HTMLDivElement;

    /**
     * Constructor for Main page object
     * @param {any} parent - parent object
     * @param {string} name - name of the page
     */
    constructor(parent: WithNavbar, name: string) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
    }

    /**
     * Renders main page
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
