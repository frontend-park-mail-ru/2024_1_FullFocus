import './index.style.scss';
import mainPageTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProductsSection } from '@/widgets/productsSection';
import { MainPageProps } from './index.types';
import { createIframe } from '@/shared/lib/createIframe';

export class Main extends Component<HTMLDivElement, MainPageProps> {
    protected productsSection: ProductsSection;
    protected iframe: HTMLIFrameElement;
    protected removeIframe: () => void;

    /**
     * Constructor for Main page object
     * @param {any} parent - parent object
     */
    constructor(
        parent: Element,
        navigateToCart: () => void,
        params: { [name: string]: string },
    ) {
        super(parent, mainPageTmpl, {
            className: 'main-page',
            navigateToCart: navigateToCart,
            params: params,
        });
    }

    updateWithParams(params: { [name: string]: string }) {
        const categoryId = Number(params['category']);
        if (categoryId) {
            this.productsSection.changeCategory(categoryId);
        }
    }

    updateDefault() {
        this.productsSection.clearCategory();
    }

    protected componentDidMount() {}

    /**
     * Renders main page
     */
    protected render() {
        this.renderTemplate();

        this.productsSection = new ProductsSection(this.htmlElement, {
            className: 'products-section-popular',
            navigateToCart: this.props.navigateToCart,
        });

        const data = createIframe(
            this.htmlElement,
            'csat-main',
            '/csat',
            600,
            300,
        );
        this.iframe = data.component;
        this.removeIframe = data.remove;

        this.iframe.addEventListener('click', this.removeIframe);
    }
}
