import './index.style.scss';
import profileOrdersInfoTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileOneOrderInfoProps } from './index.types';
import { useGetOrder } from '@/features/order/ui';
import { ProductInOrderCard } from '@/entities/order/ui';
import { ProductCard } from '@/entities/product';
import { Link } from '@/shared/uikit/link';
import { getBackLink } from '@/shared/uikit/link/lib';
import { Badge } from '@/shared/uikit/badge';
import { formatBadge } from '@/entities/order';
import { formatDate } from '@/shared/lib/date';
import { OrderStatus } from '@/entities/order/model';

export class ProfileOneOrderInfo extends Component<
    HTMLDivElement,
    ProfileOneOrderInfoProps
> {
    protected backLink: Link;
    protected statusBadge: Badge;
    protected products: ProductInOrderCard<ProductCard>[];
    constructor(parent: Element, props: ProfileOneOrderInfoProps) {
        super(parent, profileOrdersInfoTmpl, props);
    }

    protected renderSum(sum: number) {
        (
            this.htmlElement.getElementsByClassName(
                'main-info__products-total-cost',
            )[0] as HTMLDivElement
        ).innerText = `${sum} ₽`;
    }

    protected renderSumWithoutDiscount(sumWithoutDiscount: number) {
        (
            this.htmlElement.getElementsByClassName(
                'main-info__products-cost',
            )[0] as HTMLDivElement
        ).innerText = `${sumWithoutDiscount} ₽`;
    }

    protected renderDiscount(discount: number) {
        const discountElement = this.htmlElement.getElementsByClassName(
            'main-info__discount-line',
        )[0] as HTMLDivElement;

        if (discount > 0) {
            (
                this.htmlElement.getElementsByClassName(
                    'main-info__discount',
                )[0] as HTMLDivElement
            ).innerText = `-${discount} ₽`;
            discountElement.classList.remove('display_none');
            discountElement.classList.add('main-info__line');
        }

        if (discount <= 0) {
            discountElement.classList.remove('main-info__line');
            discountElement.classList.add('display_none');
        }
    }

    protected renderTotalProducsts(total: number) {
        (
            this.htmlElement.getElementsByClassName(
                'products-info__total-items',
            )[0] as HTMLDivElement
        ).innerText = total.toString();
    }

    protected renderDate(createdAt: string) {
        (
            this.htmlElement.getElementsByClassName(
                'profile-one-order-info__subheader',
            )[0] as HTMLDivElement
        ).innerText = 'от ' + formatDate(createdAt);
    }

    protected renderStatus(status: OrderStatus) {
        this.statusBadge = formatBadge(
            this.htmlElement.getElementsByClassName(
                'profile-one-order-info__header',
            )[0],
            'profile-one-order-info__status',
            status,
        );
    }

    protected renderProducts(
        products: ((parent: Element) => ProductInOrderCard<ProductCard>)[],
    ) {
        const productsSection = this.htmlElement.getElementsByClassName(
            'products-info__products',
        )[0] as HTMLDivElement;

        products.forEach((getProduct) => {
            this.products.push(getProduct(productsSection));
        });
    }

    protected render() {
        this.renderTemplate();

        this.backLink = getBackLink(
            this.htmlElement.getElementsByClassName(
                'profile-one-order-info__back-link-container',
            )[0],
            {
                className: 'profile-one-order-info__back-link',
                text: 'к списку заказов',
                href: '/profile/orders',
                style: 'primary',
            },
        );

        this.products = [];

        useGetOrder(this.props.orderId)
            .then(
                ({
                    sum,
                    sumWithoutDiscount,
                    discount,
                    status,
                    products,
                    createdAt,
                }) => {
                    this.renderSum(sum);
                    this.renderSumWithoutDiscount(sumWithoutDiscount);
                    this.renderDiscount(discount);
                    this.renderTotalProducsts(products.length);
                    this.renderDate(createdAt);
                    this.renderStatus(status);
                    this.renderProducts(products);
                },
            )
            .catch(() => {});
    }
}
