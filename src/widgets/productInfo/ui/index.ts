import './index.style.scss';
import productInfoTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProductInfoProps } from './index.types';
import { productByIdRequest } from '@/entities/product/api';
import { Button } from '@/shared/uikit/button';

export class ProductInfo extends Component<HTMLDivElement, ProductInfoProps> {
    protected buyBtn: Button;

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
        (
            this.htmlElement.getElementsByClassName(
                'product-info__product-rating-numbers',
            )[0] as HTMLDivElement
        ).innerText = `${rating}/5`;
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

    protected render() {
        productByIdRequest(this.props.productId)
            .then(({ data }) => {
                this.renderTemplate();

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
                        btnText: 'Добавить в корзину',
                        type: 'button',
                    },
                );
            })
            .catch(() => {
                // TODO add ui
                console.log('Что-то пошло не так');
            });
    }
}
