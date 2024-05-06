import './index.style.scss';
import productInfoTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProductInfoProps } from './index.types';
import { productByIdRequest } from '@/entities/product/api';
import { Button } from '@/shared/uikit/button';
import { Rating } from '@/shared/uikit/starRating';
import { addToCart } from '@/entities/cart/api';

export class ProductInfo extends Component<HTMLDivElement, ProductInfoProps> {
    protected buyBtn: Button;
    protected rating: Rating;
    protected inCart: boolean;

    constructor(parent: Element, props: ProductInfoProps) {
        super(parent, productInfoTmpl, props);
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

    protected updateDelivery(deliveryDate: string) {
        (
            this.htmlElement.getElementsByClassName(
                'product-info__to-cart-card-delivery-date',
            )[0] as HTMLDivElement
        ).innerText = 'доставка ' + deliveryDate;
    }

    setInCart() {
        this.buyBtn.btnText = 'В корзину';
        this.inCart = true;
    }

    setNotInCart() {
        this.buyBtn.btnText = 'Добавить';
        this.inCart = false;
    }

    protected componentDidMount() {
        this.buyBtn.htmlElement.addEventListener('click', () => {
            const inCart = this.inCart;

            if (inCart) {
                this.props.toCart();
            }

            if (!inCart) {
                addToCart(Number(this.props.productId))
                    .then(({ status }) => {
                        if (status === 200) {
                            this.setInCart();
                        }
                    })
                    .catch(() => {});
            }
        });
    }

    protected render() {
        this.renderTemplate();

        productByIdRequest(this.props.productId)
            .then(({ data }) => {
                this.updatePicture(data.imgSrc);
                this.updateName(data.name);
                this.updateSeller(data.seller);
                this.updateRating(data.rating);
                this.updatePrice(data.price);
                this.updateDelivery('послезавтра');

                // Buy btn
                this.buyBtn = new Button(
                    this.htmlElement.getElementsByClassName(
                        'product-info__to-cart-button-container',
                    )[0],
                    {
                        className: 'product-info__to-cart-btn',
                        btnStyle: 'bright',
                        btnText: '',
                        type: 'button',
                    },
                );

                if (data.inCart) {
                    this.setInCart();
                }

                if (!data.inCart) {
                    this.setNotInCart();
                }

                this.componentDidMount();
            })
            .catch(() => {
                // TODO add ui
                this.htmlElement.innerHTML = '';
                this.htmlElement.innerText = 'Товар не удалось найти';
            });
    }
}
