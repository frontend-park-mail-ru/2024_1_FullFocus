import { EmptyContainer } from '@/shared/uikit/emptyContainer';
import { ProductsSection } from '@/widgets/productsSection';

export class Main extends EmptyContainer {
    name: string;

    /**
     * Constructor for Main page object
     * @param {any} parent - parent object
     * @param {string} name - name of the page
     */
    constructor(parent: Element, name: string) {
        super(parent, { className: 'main-page' });
        this.name = name;
    }

    /**
     * Renders main page
     */
    render() {
        super.render();

        new ProductsSection(this.htmlElement, {
            className: 'products-section-popular',
            header: 'Популярные товары',
        }).render();
    }
}
