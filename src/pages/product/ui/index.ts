import { Component } from '@/shared/@types/index.component';
import './index.style.scss';
import productPageTmpl from './index.template.pug';
import { ProductPageProps } from './index.types';
import { ProductInfo } from '@/widgets/productInfo';

export class ProductPage extends Component<HTMLDivElement, ProductPageProps> {
    protected productInfo: ProductInfo;

    constructor(
        parent: Element,
        params: { [name: string]: string },
        navigateToMain: () => void,
        navigateToCart: () => void,
    ) {
        super(parent, productPageTmpl, {
            className: 'product-page',
            productId: params.productId,
            navigateToMain: navigateToMain,
            navigateToCart: navigateToCart,
        });
    }

    protected render() {
        if (this.props.productId !== undefined) {
            this.renderTemplate();
            this.productInfo = new ProductInfo(this.htmlElement, {
                className: 'product-page__product-info container',
                productId: this.props.productId,
                toCart: this.props.navigateToCart,
            });
        }

        if (this.props.productId === undefined) {
            this.props.navigateToMain();
        }
    }
}
