import './index.style.scss';
import cartPageTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { CartPageProps } from './index.types';
import { Cart } from '@/widgets/cart/ui';

export class CartPage extends Component<HTMLDivElement, CartPageProps> {
    protected cart: Cart;
    protected listener: (e: Event) => void;

    constructor(
        parent: Element,
        navigateToMainPage: () => void,
        navigateToOrdePage: () => void,
    ) {
        super(parent, cartPageTmpl, {
            className: 'cart-page',
            navigateToMainPage: navigateToMainPage,
            navigateToOrderPage: navigateToOrdePage,
        });
    }

    protected render() {
        this.renderTemplate();

        this.cart = new Cart(
            this.htmlElement.getElementsByClassName('section-main')[0],
            {
                className: 'cart-section',
                navigateToMainPage: this.props.navigateToMainPage,
                navigateToOrderPage: this.props.navigateToOrderPage,
            },
        );
    }
}
