import './index.style.scss';
import cartItemsSectionTempl from './index.template.pug';
import { CartItemsSectionProps } from './index.types';
import { Component } from '@/shared/@types/index.component';
import { CartItem } from '@/entities/cart';
import { ProductCard } from '@/entities/product';
import { Button } from '@/shared/uikit/button';
import { clearCart } from '@/entities/cart/api';
import { addToCart, deleteFromCart } from '@/entities/cart/api';

export class CartItemsSection extends Component<
    HTMLDivElement,
    CartItemsSectionProps
> {
    protected cartItems: { [id: number]: CartItem<ProductCard> };
    protected clearBtn: Button;
    protected clearCartListener: (e: Event) => void;
    protected counterActionListener: (e: Event) => void;

    /**
     * Constructor for ProductsSection
     * @param {Element} parent - parent html element
     */
    constructor(parent: Element, props: CartItemsSectionProps) {
        super(parent, cartItemsSectionTempl, props);
        this.cartItems = [];
    }

    protected componentDidMount() {
        this.clearCartListener = () => {
            clearCart()
                .then(({ status }) => {
                    if (status === 200) {
                        this.clearCart();
                        this.props.clearCartCallback();
                    }
                })
                .catch(() => {});
        };

        this.clearBtn.htmlElement.addEventListener(
            'click',
            this.clearCartListener,
        );

        this.counterActionListener = (e: Event) => {
            const target = e.target as HTMLElement;
            if (
                target.classList.contains('counter__minus') ||
                target.classList.contains('counter__plus')
            ) {
                e.preventDefault();
                const id = Number(target.parentElement.dataset.productid);
                const action = target.dataset.action;
                if (action === 'minus') {
                    deleteFromCart(id)
                        .then(({ data }) => {
                            if (data.count === 0) {
                                this.removeItemById(id);
                            }
                            if (data.count !== 0) {
                                this.getItemById(id).counterValue = data.count;
                            }

                            this.props.removeItemCallback(id);
                        })
                        .catch(() => {});
                }
                if (action === 'plus') {
                    addToCart(id)
                        .then(({ data }) => {
                            this.getItemById(id).counterValue = data.count;
                            this.props.addItemCallback(id);
                        })
                        .catch(() => {});
                }
            }
        };

        this.htmlElement.addEventListener('click', this.counterActionListener);
    }

    protected render() {
        this.renderTemplate();

        this.clearBtn = new Button(
            this.htmlElement.getElementsByClassName(
                'cart-items-section__clear-btn-place',
            )[0],
            {
                className: 'cart-items-section__clear-btn',
                type: 'button',
                btnStyle: 'withOutline',
                btnText: 'X',
            },
        );

        this.componentDidMount();
    }

    get cartInfo() {
        const t: { productId: number; count: number }[] = [];
        Object.entries(this.cartItems).forEach(([id, item]) => {
            t.push({ productId: Number(id), count: item.currentCounterValue });
        });
        return t;
    }

    getItemById(id: number) {
        return this.cartItems[id];
    }

    removeItemById(id: number) {
        this.cartItems[id].destroy();
    }

    clearCart() {
        Object.values(this.cartItems).forEach((item) => {
            item.destroy();
        });
        this.cartItems = {};
        (
            this.htmlElement.getElementsByClassName(
                'cart-items-section__cart-items',
            )[0] as HTMLDivElement
        ).innerText = 'корзина пуста';
    }

    renderCartItems(
        cartItems: ((parent: Element) => {
            card: CartItem<ProductCard>;
            id: number;
        })[],
    ) {
        if (cartItems.length === 0) {
            (
                this.htmlElement.getElementsByClassName(
                    'cart-items-section__cart-items',
                )[0] as HTMLDivElement
            ).innerText = 'корзина пуста';
        }

        if (cartItems.length !== 0) {
            const parent = this.htmlElement.getElementsByClassName(
                'cart-items-section__cart-items',
            )[0];
            cartItems.forEach((createItem) => {
                const { card, id } = createItem(parent);
                this.cartItems[id] = card;
            });
        }
    }

    destroy(): void {
        this.clearCart();
        this.htmlElement.remove();
    }
}