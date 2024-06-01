import './index.style.scss';
import mainPageTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProductsSection } from '@/widgets/productsSection';
import { MainPageProps } from './index.types';
import { createIframe } from '@/shared/lib/createIframe';
import { getAllCsat } from '@/entities/user/api';
import { useCheckUserLogin } from '@/features/auth';
import { CategoriesList } from '@/widgets/categoriesList';
import { ProductsSectionRecommendation } from '@/widgets/productsSectionRecommendation';

export class Main extends Component<HTMLDivElement, MainPageProps> {
    protected productsSection: ProductsSection;
    protected productsSectionRecommendation: ProductsSectionRecommendation;
    protected iframe: HTMLIFrameElement;
    protected productsCategories: CategoriesList;
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

    protected componentDidMount() {
        window.addEventListener('message', (e: MessageEvent) => {
            if (e.data === 'close-iframe') this.removeIframe();
        });
    }

    /**
     * Renders main page
     */
    protected render() {
        this.renderTemplate();

        this.productsCategories = new CategoriesList(this.htmlElement, {
            className: 'categories',
        });

        this.productsSection = new ProductsSection(this.htmlElement, {
            className: 'products',
            navigateToCart: this.props.navigateToCart,
        });

        this.productsSectionRecommendation = new ProductsSectionRecommendation(
            this.htmlElement,
            {
                className: 'promo',
                navigateToCart: this.props.navigateToCart,
            },
        );

        useCheckUserLogin()
            .then((isLogged) => {
                if (!isLogged) return;

                getAllCsat()
                    .then((response) => {
                        if (response) {
                            setTimeout(() => {
                                if (response.data !== undefined) {
                                    const data = createIframe(
                                        this.htmlElement,
                                        'csat-main',
                                        `/csat?question_id=${response.data[0].id}&title=${response.data[0].title}`,
                                        450,
                                        202,
                                    );
                                    this.iframe = data.component;
                                    this.removeIframe = data.remove;
                                }
                            }, 1500);
                        }
                    })
                    .catch(() => {});
            })
            .catch(() => {});

        this.componentDidMount();
    }
}
