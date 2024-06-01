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
import { animateLongRequest } from '@/shared/api/ajax/throttling';

export class ProfileOneOrderInfo extends Component<
    HTMLDivElement,
    ProfileOneOrderInfoProps
> {
    protected backLink: Link;
    protected statusBadge: Badge;
    protected sum: HTMLDivElement;
    protected sumWithoutDiscount: HTMLDivElement;
    protected discount: HTMLDivElement;
    protected totalProducts: HTMLDivElement;
    protected date: HTMLDivElement;
    protected status: HTMLDivElement;
    protected productsSection: HTMLDivElement;
    protected products: ProductInOrderCard<ProductCard>[];
    constructor(parent: Element, props: ProfileOneOrderInfoProps) {
        super(parent, profileOrdersInfoTmpl, props);
    }

    protected renderSum(sum: number) {
        this.sum.innerText = `${sum} ₽`;
    }

    protected renderSumWithoutDiscount(sumWithoutDiscount: number) {
        this.sumWithoutDiscount.innerText = `${sumWithoutDiscount} ₽`;
    }

    protected renderDiscount(discount: number) {
        const discountElement = this.htmlElement.getElementsByClassName(
            'main-info__discount-line',
        )[0] as HTMLDivElement;

        if (discount > 0) {
            this.discount.innerText = `-${discount} ₽`;
            discountElement.classList.remove('display_none');
            discountElement.classList.add('main-info__line');
        }

        if (discount <= 0) {
            discountElement.classList.remove('main-info__line');
            discountElement.classList.add('display_none');
        }
    }

    protected renderTotalProducsts(total: number) {
        this.totalProducts.innerText = total.toString();
    }

    protected renderDate(createdAt: string) {
        this.date.innerText = 'от ' + formatDate(createdAt);
    }

    protected renderStatus(status: OrderStatus) {
        this.statusBadge = formatBadge(
            this.status,
            'profile-one-order-info__status',
            status,
        );
    }

    protected renderProducts(
        products: ((parent: Element) => ProductInOrderCard<ProductCard>)[],
    ) {
        products.forEach((getProduct) => {
            this.products.push(getProduct(this.productsSection));
        });
    }

    startLoading() {
        this.sum.classList.add('main-info--loading');
        this.sumWithoutDiscount.classList.add('main-info--loading');
        this.discount.classList.add('main-info--loading');
        this.date.classList.add('main-info--loading');
        this.productsSection.classList.add('main-info-products--loading');
    }

    stopLoading() {
        this.sum.classList.remove('main-info--loading');
        this.sumWithoutDiscount.classList.remove('main-info--loading');
        this.discount.classList.remove('main-info--loading');
        this.date.classList.remove('main-info--loading');
        this.productsSection.classList.remove('main-info-products--loading');
    }

    protected initSections() {
        this.sum = this.htmlElement.getElementsByClassName(
            'main-info__products-total-cost',
        )[0] as HTMLDivElement;

        this.sumWithoutDiscount = this.htmlElement.getElementsByClassName(
            'main-info__products-cost',
        )[0] as HTMLDivElement;

        this.discount = this.htmlElement.getElementsByClassName(
            'main-info__discount',
        )[0] as HTMLDivElement;

        this.date = this.htmlElement.getElementsByClassName(
            'profile-one-order-info__subheader',
        )[0] as HTMLDivElement;

        this.totalProducts = this.htmlElement.getElementsByClassName(
            'products-info__total-items',
        )[0] as HTMLDivElement;

        this.status = this.htmlElement.getElementsByClassName(
            'profile-one-order-info__header',
        )[0] as HTMLDivElement;

        this.productsSection = this.htmlElement.getElementsByClassName(
            'products-info__products',
        )[0] as HTMLDivElement;
    }

    protected errorMsg() {
        (
            this.htmlElement.getElementsByClassName(
                'profile-one-order-info__order-details',
            )[0] as HTMLDivElement
        ).innerText = 'Что-то пошло не так';
    }

    protected addBackBtn() {
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
    }

    protected render() {
        this.renderTemplate();

        this.initSections();

        this.addBackBtn();

        this.products = [];

        animateLongRequest(
            () => {
                return useGetOrder(this.props.orderId);
            },
            ({
                sum,
                sumWithoutDiscount,
                discount,
                status,
                products,
                createdAt,
            }) => {
                const isOk = sum > 0;

                if (isOk) {
                    this.renderSum(sum);
                    this.renderSumWithoutDiscount(sumWithoutDiscount);
                    this.renderDiscount(discount);
                    this.renderTotalProducsts(products.length);
                    this.renderDate(createdAt);
                    this.renderStatus(status);
                    this.renderProducts(products);
                }

                if (!isOk) {
                    this.errorMsg();
                }
            },
            () => {
                this.errorMsg();
            },
            () => {
                this.startLoading();
            },
            () => {
                this.stopLoading();
            },
            150,
            1000,
        )();
    }
}
