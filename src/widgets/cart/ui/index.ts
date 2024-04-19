import './index.style.scss';
import cartTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { CartProps } from './index.types';
import { useGetUserCart } from '@/features/cart';
import { CartItemsSection } from './cartItemsSection';
import { CartInfo } from './cartInfo';
import { OrderOptions } from './orderOptions';
import { createOrderRequest } from '@/entities/order';
import { ProductCard } from '@/entities/product';
import { CartItem } from '@/entities/cart';

export class Cart extends Component<HTMLDivElement, CartProps> {
    protected cartItemsSection: CartItemsSection;
    protected cartInfoParent: HTMLDivElement;
    protected cartMainParent: HTMLDivElement;
    protected emptyInfo: HTMLDivElement;
    protected cartInfo: CartInfo;
    protected orderOptions: OrderOptions;

    constructor(parent: Element, props: CartProps) {
        super(parent, cartTmpl, props);
    }

    protected render() {
        this.renderTemplate();

        this.cartMainParent = this.htmlElement.getElementsByClassName(
            'cart__main',
        )[0] as HTMLDivElement;

        this.cartInfoParent = this.htmlElement.getElementsByClassName(
            'cart__info',
        )[0] as HTMLDivElement;

        this.emptyInfo = this.htmlElement.getElementsByClassName(
            'cart__empty-info',
        )[0] as HTMLDivElement;

        useGetUserCart()
            .then(({ cost, cartItems, total }) => {
                if (cartItems.length === 0) {
                    this.renderEmpty();
                }

                if (cartItems.length !== 0) {
                    this.renderWithItems(cost, cartItems, total);
                }
            })
            .catch(() => {});
    }

    protected renderEmpty() {
        this.cartInfoParent.classList.add('display_none');
        this.cartMainParent.classList.add('display_none');
        this.emptyInfo.classList.remove('display_none');
    }

    protected renderWithItems(
        cost: number,
        cartItems: ((parent: Element) => {
            card: CartItem<ProductCard>;
            id: number;
        })[],
        total: number,
    ) {
        this.cartItemsSection = new CartItemsSection(this.cartMainParent, {
            className: 'cart__cart-items',
            clearCartCallback: () => {
                this.renderEmpty();
                this.cartInfo.updateCartInfo(0, 0);
            },
            addItemCallback: (id: number) => {
                this.cartInfo.addProduct(
                    this.cartItemsSection.getItemById(id).productCardItem.price,
                );
            },
            removeItemCallback: (id: number) => {
                this.cartInfo.substractProduct(
                    this.cartItemsSection.getItemById(id).productCardItem.price,
                );
            },
        });

        this.cartInfo = new CartInfo(this.cartInfoParent, {
            className: 'cart-info__info',
            orderCreatedCallback: () => {
                createOrderRequest(this.cartItemsSection.cartInfo)
                    .then(() => {
                        this.props.navigateToOrderPage();
                    })
                    .catch(() => {});
            },
            navigateToMainPage: this.props.navigateToMainPage,
            navigateToOrderPage: this.props.navigateToOrderPage,
        });
        this.cartItemsSection.renderCartItems(cartItems);
        this.cartInfo.updateCartInfo(cost, total);
    }
}
