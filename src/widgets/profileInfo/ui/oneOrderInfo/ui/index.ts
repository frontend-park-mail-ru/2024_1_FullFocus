import './index.style.scss';
import profileOrdersInfoTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileOneOrderInfoProps } from './index.types';
import { useGetOrder } from '@/features/order/ui';
import { ProductInOrderCard } from '@/entities/order/ui';
import { ProductCard } from '@/entities/product';

export class ProfileOneOrderInfo extends Component<
    HTMLDivElement,
    ProfileOneOrderInfoProps
> {
    protected products: ProductInOrderCard<ProductCard>[];
    constructor(parent: Element, props: ProfileOneOrderInfoProps) {
        super(parent, profileOrdersInfoTmpl, props);
    }

    protected render() {
        this.renderTemplate();

        this.products = [];

        useGetOrder(this.props.orderId)
            .then(({ sum, itemsCount, status, products }) => {
                (
                    this.htmlElement.getElementsByClassName(
                        'main-info__products-cost',
                    )[0] as HTMLDivElement
                ).innerText = sum.toString();

                (
                    this.htmlElement.getElementsByClassName(
                        'main-info__products-total-cost',
                    )[0] as HTMLDivElement
                ).innerText = sum.toString();
                (
                    this.htmlElement.getElementsByClassName(
                        'products-info__total-items',
                    )[0] as HTMLDivElement
                ).innerText = itemsCount.toString();
                (
                    this.htmlElement.getElementsByClassName(
                        'profile-one-order-info__status',
                    )[0] as HTMLDivElement
                ).innerText = status;

                const productsSection = this.htmlElement.getElementsByClassName(
                    'products-info__products',
                )[0] as HTMLDivElement;
                products.forEach((getProduct) => {
                    this.products.push(getProduct(productsSection));
                });
            })
            .catch(() => {});
    }
}
