import { EmptyContainer } from '@/shared/uikit/emptyContainer';
import { ProductsSection } from '@/widgets/productsSection';

export class Main extends EmptyContainer {
    /**
     * Constructor for Main page object
     * @param {any} parent - parent object
     */
    constructor(parent: Element) {
        super(parent, { className: 'main-page' });
    }

    /**
     * Renders main page
     */
    protected render() {
        this.renderTemplate();

        new ProductsSection(this.htmlElement, {
            className: 'products-section-popular',
            header: 'Популярные товары',
        });
    }
}
