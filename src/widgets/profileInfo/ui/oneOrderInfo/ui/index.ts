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
            .then(({ sum, status, products, createdAt }) => {
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
                ).innerText = products.length.toString();
                (
                    this.htmlElement.getElementsByClassName(
                        'profile-one-order-info__subheader',
                    )[0] as HTMLDivElement
                ).innerText = 'от ' + formatDate(createdAt);

                this.statusBadge = formatBadge(
                    this.htmlElement.getElementsByClassName(
                        'profile-one-order-info__header',
                    )[0],
                    'profile-one-order-info__status',
                    status,
                );

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
