import './index.style.scss';
import cartItemsSectionTempl from './index.template.pug';
import { CartItemsSectionProps } from './index.types';
import { Component } from '@/shared/@types/index.component';
import { CartItem } from '@/entities/cart';
import { ProductCard } from '@/entities/product';
import { Button } from '@/shared/uikit/button';
import { clearCart } from '@/entities/cart/api';
import { addToCart, deleteFromCart } from '@/entities/cart/api';
import { animateLongRequest } from '@/shared/api/ajax/throttling';

export class CartItemsSection extends Component<
    HTMLDivElement,
    CartItemsSectionProps
> {
    protected cartItems: { [id: number]: CartItem<ProductCard> };
    protected clearBtn: Button;
    protected totalUniqueItems: number;
    protected cartItemsElement: HTMLDivElement;
    protected clearCartListener: (e: Event) => void;
    protected counterActionListener: (e: Event) => void;
    protected deleteFromCartAnimated: (id: number) => void;
    protected addToCartAnimated: (id: number) => void;
    protected enabled: boolean;

    /**
     * Constructor for ProductsSection
     * @param {Element} parent - parent html element
     */
    constructor(parent: Element, props: CartItemsSectionProps) {
        super(parent, cartItemsSectionTempl, props);
        this.cartItems = [];
        this.totalUniqueItems = 0;
        this.cartItemsElement = this.htmlElement.getElementsByClassName(
            'cart-items-section__cart-items',
        )[0] as HTMLDivElement;
        this.enabled = true;

        this.deleteFromCartAnimated = (id: number) => {
            const counter = this.getItemById(id).counterComponent;
            counter.setDisabled();
            animateLongRequest(
                () => {
                    return deleteFromCart(id);
                },
                ({ data }) => {
                    if (data.count === 0) {
                        this.removeItemById(id);
                        this.updateNavbar();
                    }
                    if (data.count !== 0) {
                        this.getItemById(id).counterValue = data.count;
                    }

                    this.props.removeItemCallback(id);
                },
                () => {},
                () => {
                    counter.startLoading();
                },
                () => {
                    counter.stopLoading();
                    counter.setEnabled();
                },
                150,
                1000,
            )();
        };

        this.addToCartAnimated = (id: number) => {
            const counter = this.getItemById(id).counterComponent;
            counter.setDisabled();
            animateLongRequest(
                () => {
                    return addToCart(id);
                },
                ({ data }) => {
                    this.getItemById(id).counterValue = data.count;
                    this.props.addItemCallback(id);
                },
                () => {},
                () => {
                    counter.startLoading();
                },
                () => {
                    counter.stopLoading();
                    counter.setEnabled();
                },
                150,
                1000,
            )();
        };
    }

    protected componentDidMount() {
        this.clearCartListener = () => {
            if (!this.enabled) return;
            this.clearCart();
            clearCart()
                .then(({ status }) => {
                    if (status === 200) {
                        this.updateNavbar();
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
            if (!this.enabled) return;
            let target = e.target as HTMLElement;
            if (
                target.classList.contains('counter__minus') ||
                target.classList.contains('counter__plus') ||
                target.classList.contains('counter__icon') ||
                target.classList.contains('counter__icon-path')
            ) {
                target = target.closest('.counter__btn');
                e.preventDefault();
                const id = Number(target.parentElement.dataset.productid);
                const action = target.dataset.action;
                if (action === 'minus') {
                    this.deleteFromCartAnimated(id);
                }
                if (action === 'plus') {
                    this.addToCartAnimated(id);
                }
            }
        };

        this.htmlElement.addEventListener('click', this.counterActionListener);
    }

    private updateNavbar() {
        this.htmlElement.dispatchEvent(
            new Event('updatenavbar', {
                bubbles: true,
            }),
        );
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
                btnStyle: 'white',
                btnText: 'очистить',
                size: 'no-padding',
            },
        );

        this.componentDidMount();
    }

    protected emptyCartMessage() {
        this.cartItemsElement.innerText = 'корзина пуста';
    }

    get cartInfo() {
        const t: { productId: number; count: number }[] = [];
        Object.entries(this.cartItems).forEach(([id, item]) => {
            t.push({ productId: Number(id), count: item.currentCounterValue });
        });
        return t;
    }

    setDisabled() {
        this.clearBtn.setDisabled();
        this.enabled = false;
    }

    setEnabled() {
        this.clearBtn.setEnabled();
        this.enabled = true;
    }

    startLoading() {
        this.cartItemsElement.classList.add(
            'cart-items-section__cart-items--loading',
        );
    }

    stopLoading() {
        this.cartItemsElement.classList.remove(
            'cart-items-section__cart-items--loading',
        );
    }

    getItemById(id: number) {
        return this.cartItems[id];
    }

    removeItemById(id: number) {
        this.cartItems[id].destroy();
        this.totalUniqueItems--;
        if (this.totalUniqueItems === 0) {
            this.emptyCartMessage();
        }
    }

    clearCart() {
        Object.values(this.cartItems).forEach((item) => {
            item.destroy();
        });
        this.cartItems = {};
        this.emptyCartMessage();
    }

    renderCartItems(
        cartItems: ((parent: Element) => {
            card: CartItem<ProductCard>;
            id: number;
        })[],
    ) {
        if (cartItems.length === 0) {
            this.emptyCartMessage();
        }

        if (cartItems.length !== 0) {
            cartItems.forEach((createItem) => {
                const { card, id } = createItem(this.cartItemsElement);
                this.cartItems[id] = card;
                this.totalUniqueItems++;
            });
        }
    }

    destroy(): void {
        this.clearCart();
        this.htmlElement.remove();
    }
}
