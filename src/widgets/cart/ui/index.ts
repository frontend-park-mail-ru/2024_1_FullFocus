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
import { CartPromocodes } from './promocode';
import { toast } from '@/shared/uikit/toast';

export class Cart extends Component<HTMLDivElement, CartProps> {
    protected cartItemsSection: CartItemsSection;
    protected cartInfoParent: HTMLDivElement;
    protected cartMainParent: HTMLDivElement;
    protected emptyInfo: HTMLDivElement;
    protected cartInfo: CartInfo;
    protected cartPromocodes: CartPromocodes;
    protected orderOptions: OrderOptions;
    protected promocodeId: number;
    protected addError: (header: string, text: string) => void;
    protected addSuccess: (header: string, text: string) => void;

    constructor(parent: Element, props: CartProps) {
        super(parent, cartTmpl, props);
        this.addError = toast().addError;
        this.addSuccess = toast().addSuccess;
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
        this.renderCartItemsSection();
        this.renderCartInfo();
        this.renderCartPromocodes();

        this.cartItemsSection.renderCartItems(cartItems);
        this.cartInfo.updateCartInfo(cost, total);
    }

    protected renderCartItemsSection() {
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
    }

    protected renderCartInfo() {
        this.cartInfo = new CartInfo(this.cartInfoParent, {
            className: 'cart-info__info',
            orderCreatedCallback: () => {
                createOrderRequest(
                    this.cartItemsSection.cartInfo,
                    this.promocodeId,
                )
                    .then(({ status, data }) => {
                        if (status === 200) {
                            this.props.navigateToOrderPage({
                                id: data.orderID.toString(),
                            });
                            this.addSuccess(
                                'Заказ успешно создан!',
                                data.newPromocodeID
                                    ? 'Вам добавлен новый промокод!'
                                    : '',
                            );
                        }

                        if (status !== 200) {
                            this.errorToast();
                        }
                    })
                    .catch(() => {
                        this.errorToast();
                    });
            },
            navigateToMainPage: this.props.navigateToMainPage,
            navigateToOrderPage: this.props.navigateToOrderPage,
        });
    }

    protected errorToast() {
        this.addError(
            'Ошибка',
            'Что-то пошло не так, попробуйте сделать это позже',
        );
    }

    protected renderCartPromocodes() {
        this.cartPromocodes = new CartPromocodes(this.cartInfoParent, {
            className: 'cart-info__promocodes',
            promocodeUsedCallback: (id, minSum, benefitType, value) => {
                this.promocodeId = id;
                this.cartInfo.applyDiscount(minSum, benefitType, value);
            },
            promocodeCanceledCallback: () => {
                this.promocodeId = null;
                this.cartInfo.removeDiscount();
            },
        });
    }
}
