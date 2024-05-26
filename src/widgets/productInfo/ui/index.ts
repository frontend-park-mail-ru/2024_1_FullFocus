import './index.style.scss';
import productInfoTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProductInfoProps } from './index.types';
import {
    BenefitType,
    getSaleByBenefitType,
    productByIdRequest,
} from '@/entities/product';
import { Rating } from '@/shared/uikit/starRating';
import { addToCart, deleteFromCart } from '@/entities/cart/api';
import { CommentWidget } from './comment';
import { AddToCartBtn } from '@/entities/productsSection/ui/productsList/ui';
import { animateLongRequest } from '@/shared/api/ajax/throttling';
import { toast } from '@/shared/uikit/toast';

export class ProductInfo extends Component<HTMLDivElement, ProductInfoProps> {
    protected commentWidget: CommentWidget;
    protected addToCartbtn: AddToCartBtn;
    protected rating: Rating;
    protected amount: number;
    protected addToCart: (id: number) => void;
    protected removeFromCart: (id: number) => void;
    protected addError: (header: string, text: string) => void;

    constructor(parent: Element, props: ProductInfoProps) {
        super(parent, productInfoTmpl, props);
        this.addError = toast().addError;
    }

    protected updatePicture(src: string) {
        (
            this.htmlElement.getElementsByClassName(
                'product-info__picture',
            )[0] as HTMLImageElement
        ).src = src;
    }

    protected updateName(name: string) {
        (
            this.htmlElement.getElementsByClassName(
                'product-info__product-name',
            )[0] as HTMLDivElement
        ).innerText = name;
    }

    protected updateSeller(seller: string) {
        (
            this.htmlElement.getElementsByClassName(
                'product-info__product-seller',
            )[0] as HTMLDivElement
        ).innerText = seller;
    }

    protected updateRating(rating: number) {
        if (this.rating) {
            this.rating.destroy();
        }

        this.rating = new Rating(
            this.htmlElement.getElementsByClassName(
                'product-info__product-rating-stars',
            )[0],
            {
                className: 'rating-stars',
                rating: rating,
                maxRating: 5,
                size: 40,
                fullColorHex: '#FCD53F',
                emptyColorHex: '#E2E6E9',
            },
        );
    }

    protected updatePrice(price: number) {
        (
            this.htmlElement.getElementsByClassName(
                'product-info__to-cart-card-price',
            )[0] as HTMLDivElement
        ).innerText = `${price} ₽`;
    }

    protected updatePriceAndSale(
        oldPrice: number,
        newPrice: number,
        benefitType: BenefitType,
        benefitValue: number,
    ) {
        const sale = getSaleByBenefitType(oldPrice, benefitType, benefitValue);

        (
            this.htmlElement.getElementsByClassName(
                'product-info__to-cart-card-old-price',
            )[0] as HTMLDivElement
        ).innerText = `${oldPrice} ₽`;

        (
            this.htmlElement.getElementsByClassName(
                'product-info__to-cart-card-new-price',
            )[0] as HTMLDivElement
        ).innerText = `${newPrice} ₽`;
        (
            this.htmlElement.getElementsByClassName(
                'product-info__to-cart-card-sale',
            )[0] as HTMLDivElement
        ).innerText = `-${sale} %`;
        (
            this.htmlElement.getElementsByClassName(
                'product-info__to-cart-card-new-price',
            )[0] as HTMLDivElement
        ).style.backgroundColor = '#10c44c';
    }

    protected updateDelivery(deliveryDate: string) {
        (
            this.htmlElement.getElementsByClassName(
                'product-info__to-cart-card-delivery-date',
            )[0] as HTMLDivElement
        ).innerText = 'доставка ' + deliveryDate;
    }

    setInCart(amount: number) {
        this.addToCartbtn.setInCart(amount);
    }

    setNotInCart() {
        this.addToCartbtn.setNotInCart();
    }

    get inCart() {
        return this.addToCartbtn.inCart;
    }

    set counterValue(value: number) {
        this.addToCartbtn.counterValue = value;
    }

    // eslint-disable-next-line max-lines-per-function
    protected componentDidMount() {
        this.addToCartbtn.btn.htmlElement.addEventListener('click', () => {
            if (!this.inCart) {
                this.addToCartbtn.setDisabled();
                animateLongRequest(
                    addToCart,
                    ({ status, data }) => {
                        if (status === 200) {
                            this.setInCart(data.count);
                            this.htmlElement.dispatchEvent(
                                new Event('updatenavbar', {
                                    bubbles: true,
                                }),
                            );
                        }

                        if (status !== 200) {
                            this.noAuthMsg();
                        }
                    },
                    () => {
                        this.errorMsg();
                    },
                    () => {
                        this.addToCartbtn.setLoading();
                    },
                    () => {
                        this.addToCartbtn.removeLoading();
                        this.addToCartbtn.setEnabled();
                    },
                    500,
                    1500,
                )(Number(this.props.productId));
            }
        });

        this.addToCartbtn.counterItem.htmlElement.addEventListener(
            'click',
            (e: Event) => {
                const counterBtn = (e.target as HTMLElement).closest(
                    '.counter__btn',
                );
                const action = (counterBtn as HTMLElement).dataset.action;
                const id = Number(this.props.productId);
                if (action === 'minus') {
                    this.disableInput();

                    animateLongRequest(
                        deleteFromCart,
                        ({ status, data }) => {
                            if (status === 200) {
                                if (data.count === 0) {
                                    this.setNotInCart();
                                    this.updateNavbar();
                                }

                                if (data.count !== 0) {
                                    this.counterValue = data.count;
                                }
                            }

                            if (status !== 200) {
                                this.noAuthMsg();
                            }
                        },
                        () => {
                            this.errorMsg();
                        },
                        () => {
                            this.addToCartbtn.setLoading();
                        },
                        () => {
                            this.addToCartbtn.removeLoading();
                            this.addToCartbtn.setEnabled();
                        },
                        500,
                        1500,
                    )(id);
                }

                if (action === 'plus') {
                    this.disableInput();
                    animateLongRequest(
                        addToCart,
                        ({ status, data }) => {
                            if (status === 200) {
                                this.counterValue = data.count;
                            }

                            if (status !== 200) {
                                this.noAuthMsg();
                            }
                        },
                        () => {},
                        () => {
                            this.addToCartbtn.setLoading();
                        },
                        () => {
                            this.addToCartbtn.removeLoading();
                            this.addToCartbtn.setEnabled();
                        },
                        500,
                        1500,
                    )(id);
                }
            },
        );
    }

    protected noAuthMsg() {
        this.addError('Ошибка', 'Сначала вам необходимо авторизоваться!');
    }

    protected errorMsg() {
        this.addError('Ошибка', 'Что-то пошло не так');
    }

    private updateNavbar() {
        this.htmlElement.dispatchEvent(
            new Event('updatenavbar', {
                bubbles: true,
            }),
        );
    }

    protected disableInput() {
        this.addToCartbtn.setDisabled();
        this.addToCartbtn.setLoading();
    }

    protected enableInput() {
        this.addToCartbtn.setEnabled();
        this.addToCartbtn.removeLoading();
    }

    protected render() {
        this.renderTemplate();

        productByIdRequest(this.props.productId)
            .then(({ data }) => {
                this.updatePicture(data.imgSrc);
                this.updateName(data.name);
                this.updateSeller(data.seller);
                this.updateRating(data.rating);
                if (data.newPrice == 0) {
                    this.updatePrice(data.oldPrice);
                } else {
                    this.updatePriceAndSale(
                        data.oldPrice,
                        data.newPrice,
                        data.benefitType,
                        data.benefitValue,
                    );
                }
                this.updateDelivery('послезавтра');

                this.commentWidget = new CommentWidget(this.htmlElement, {
                    className: 'product-info__comment-section',
                    productID: this.props.productId,
                    productDescription: data.name,
                    productSrc: data.imgSrc,
                    commentAddedCallback: () => {
                        productByIdRequest(this.props.productId)
                            .then(({ data }) => {
                                this.updateRating(data.rating);
                            })
                            .catch(() => {});
                    },
                });
                // Buy btn
                this.addToCartbtn = new AddToCartBtn(
                    this.htmlElement.getElementsByClassName(
                        'product-info__to-cart-button-container',
                    )[0],
                    {
                        className: 'product-info__to-cart-btn',
                        amount: data.amount,
                    },
                );

                this.componentDidMount();
            })
            .catch(() => {
                this.htmlElement.innerHTML = '';
                this.htmlElement.innerText = 'Товар не удалось найти';
            });
    }
}
