import './index.style.scss';
import mainPageTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProductsSection } from '@/widgets/productsSection';
import { MainPageProps } from './index.types';

export class Main extends Component<HTMLDivElement, MainPageProps> {
    /**
     * Constructor for Main page object
     * @param {any} parent - parent object
     */
    constructor(
        parent: Element,
        navigateToCart: () => void,
        params?: { [name: string]: string },
    ) {
        super(parent, mainPageTmpl, {
            className: 'main-page',
            navigateToCart: navigateToCart,
            params,
        });
    }

    /**
     * Renders main page
     */
    protected render() {
        this.renderTemplate();

        new ProductsSection(this.htmlElement, {
            className: 'products-section-popular',
            categoryId: Number(this.props.params['category']),
            navigateToCart: this.props.navigateToCart,
        });
    }
}
