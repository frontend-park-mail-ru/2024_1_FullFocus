import './index.style.scss';
import { Component } from '@/shared/@types/index.component';
import { ProductsListProps } from './index.types';
import { ProductsSectionItem } from './productsSectionItem';
import { addToCart, deleteFromCart } from '@/entities/cart/api';
import { List } from '@/shared/uikit/list';
import { isCounterClicked } from '@/shared/uikit/counter';
import { animateLongRequest } from '@/shared/api/ajax/throttling';

export { ProductsSectionItem, AddToCartBtn } from './productsSectionItem';

export class ProductsList<
    ProductCardType extends Component<Element>,
> extends List<ProductsSectionItem<ProductCardType>> {
    protected navigateToCart: () => void;
    protected listener: (e: Event) => void;

    constructor(parent: Element, props: ProductsListProps) {
        super(parent, {
            className: props.className,
            wrap: true,
            emptyText: 'товары отсутствуют',
        });
    }

    // eslint-disable-next-line max-lines-per-function
    protected componentDidMount() {
        // eslint-disable-next-line max-lines-per-function
        this.listener = (e: Event) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'button' ||
                target.classList.contains('btn__text')
            ) {
                const item = target.closest('.products-section-item');
                const id = Number((item as HTMLElement).dataset.id);
                if (!this.productCardById(id).inCart) {
                    this.productCardById(id).setDisabled();
                    animateLongRequest(
                        addToCart,
                        ({ status, data }) => {
                            if (status === 200) {
                                if (status === 200) {
                                    this.productCardById(id).setInCart(
                                        data.count,
                                    );
                                    this.updateNavbar();
                                }
                            }
                        },
                        () => {},
                        () => {
                            this.productCardById(id).setLoading();
                        },
                        () => {
                            this.productCardById(id).removeLoading();
                            this.productCardById(id).setEnabled();
                        },
                        500,
                        1000,
                    )(id);
                }
            }
            if (isCounterClicked(target)) {
                const counterBtn = target.closest('.counter__btn');
                const item = target.closest('.products-section-item');
                const id = Number((item as HTMLElement).dataset.id);
                const action = (counterBtn as HTMLElement).dataset.action;
                if (action === 'minus') {
                    this.productCardById(id).setDisabled();
                    animateLongRequest(
                        deleteFromCart,
                        ({ status, data }) => {
                            if (status === 200) {
                                if (data.count === 0) {
                                    this.productCardById(id).setNotInCart();
                                    this.updateNavbar();
                                }
                                if (data.count !== 0) {
                                    this.productCardById(id).counterValue =
                                        data.count;
                                }
                            }
                        },
                        () => {},
                        () => {
                            this.productCardById(id).setLoading();
                        },
                        () => {
                            this.productCardById(id).removeLoading();
                            this.productCardById(id).setEnabled();
                        },
                        500,
                        1000,
                    )(id);
                }
                if (action === 'plus') {
                    this.productCardById(id).setDisabled();
                    animateLongRequest(
                        addToCart,
                        ({ status, data }) => {
                            if (status === 200) {
                                this.productCardById(id).counterValue =
                                    data.count;
                            }
                        },
                        () => {},
                        () => {
                            this.productCardById(id).setLoading();
                        },
                        () => {
                            this.productCardById(id).removeLoading();
                            this.productCardById(id).setEnabled();
                        },
                        500,
                        1000,
                    )(id);
                }
            }
        };

        this.htmlElement.addEventListener('click', this.listener);
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

        this.componentDidMount();
    }

    loadProducts(
        products: ((parent: Element) => {
            item: ProductsSectionItem<ProductCardType>;
            id: string;
        })[],
    ): void {
        this.renderItems(products);
    }

    productCardById(id: number) {
        return this.itemById(id.toString());
    }

    destroy(): void {
        this.clear();
        this.htmlElement.remove();
    }
}
