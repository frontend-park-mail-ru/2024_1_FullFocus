import './index.style.scss';
import cartTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { CartProps } from './index.types';
import { useGetUserCart } from '@/features/cart';
import { CartItemsSection } from './cartItemsSection';
import { CartInfo } from './cartInfo';
import { OrderOptions } from './orderOptions';

export class Cart extends Component<HTMLDivElement, CartProps> {
    protected cartItemsSection: CartItemsSection;
    protected cartInfo: CartInfo;
    protected orderOptions: OrderOptions;

    constructor(parent: Element, props: CartProps) {
        super(parent, cartTmpl, props);
    }

    protected render() {
        this.renderTemplate();

        this.cartItemsSection = new CartItemsSection(
            this.htmlElement.getElementsByClassName('cart__main')[0],
            {
                className: 'cart__cart-items',
                clearCartCallback: () => {
                    this.cartInfo.updateCartInfo(0, 0);
                },
                addItemCallback: (id: number) => {
                    this.cartInfo.addProduct(
                        this.cartItemsSection.getItemById(id).productCardItem
                            .price,
                    );
                },
                removeItemCallback: (id: number) => {
                    this.cartInfo.substractProduct(
                        this.cartItemsSection.getItemById(id).productCardItem
                            .price,
                    );
                },
            },
        );

        this.cartInfo = new CartInfo(
            this.htmlElement.getElementsByClassName('cart__info')[0],
            {
                className: 'cart-info__info',
                navigateToMainPage: this.props.navigateToMainPage,
            },
        );

        useGetUserCart()
            .then(({ cost, cartItems, total }) => {
                this.cartItemsSection.renderCartItems(cartItems);
                this.cartInfo.updateCartInfo(cost, total);
            })
            .catch(() => {});
    }
}
