import { EmptyContainer } from '@/shared/uikit/emptyContainer';
import { WithNavbar } from '@/widgets/layout';
import { ProductsSection } from '@/widgets/productsSection';

export class Main extends EmptyContainer {
    parentItem: WithNavbar;
    name: string;

    /**
     * Constructor for Main page object
     * @param {any} parent - parent object
     * @param {string} name - name of the page
     */
    constructor(parent: WithNavbar, name: string) {
        super(parent.contentElement, { className: 'main-page' });
        this.parentItem = parent;
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
        // this.htmlElement = productsSection.htmlElement;
    }
}
