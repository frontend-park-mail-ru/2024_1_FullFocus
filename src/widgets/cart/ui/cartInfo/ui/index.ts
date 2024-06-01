import { Component } from '@/shared/@types/index.component';
import './index.style.scss';
import cartInfoTmpl from './index.template.pug';
import { CartInfoProps } from './index.types';
import { Button } from '@/shared/uikit/button';
import { BenefitType } from '@/entities/product';
import { Discount } from './discount';
import { formatQuantity } from '@/entities/order/lib';

export class CartInfo extends Component<HTMLDivElement, CartInfoProps> {
    protected confirmButton: Button;
    protected cost: number;
    protected total: number;
    protected costElement: HTMLDivElement;
    protected totalCostElement: HTMLDivElement;
    protected totalElement: HTMLDivElement;
    protected discount: Discount;
    protected placeOrderListener: (e: Event) => void;

    constructor(parent: Element, props: CartInfoProps) {
        super(parent, cartInfoTmpl, props);
    }

    updateCartInfo(cost = this.cost, total = this.total) {
        this.cost = cost;
        this.total = total;
        this.costElement.innerText = this.cost.toString() + ' ₽';
        this.totalElement.innerText = formatQuantity(this.total);

        if (this.props.discountInfo) {
            this.updateDiscountComponent();
            this.totalCostElement.innerText =
                (this.cost - this.discount.discountSum).toString() + ' ₽';
        }

        if (!this.props.discountInfo) {
            this.totalCostElement.innerText = this.cost.toString() + ' ₽';
        }

        if (this.total <= 0) {
            this.setDisabled();
        }
        if (this.total > 0) {
            this.setEnabled();
        }
    }

    applyDiscount(minSum: number, benefitType: BenefitType, value: number) {
        this.props.discountInfo = {
            minSum: minSum,
            benefitType: benefitType,
            value: value,
        };

        const discountCreated = this.discount !== null;
        if (!discountCreated) {
            this.discount = new Discount(
                this.htmlElement.getElementsByClassName(
                    'cart-info__money-info',
                )[0],
                {
                    className: 'cart-info__discount-info',
                    minSum: minSum,
                    benefitType: benefitType,
                    value: value,
                    currentSum: this.cost,
                },
            );
        }

        if (discountCreated) {
            this.discount.setNewDiscount(minSum, benefitType, value, this.cost);
        }

        this.updateCartInfo();
    }

    startLoading() {
        this.costElement.classList.add('cart-info--loading');
        this.totalCostElement.classList.add('cart-info--loading');
        this.totalElement.classList.add('cart-info--loading');
    }

    stopLoading() {
        this.costElement.classList.remove('cart-info--loading');
        this.totalCostElement.classList.remove('cart-info--loading');
        this.totalElement.classList.remove('cart-info--loading');
    }

    removeDiscount() {
        this.discount.destroy();
        this.discount = null;
        this.props.discountInfo = null;
        this.updateCartInfo();
    }

    substractProduct(productCost: number) {
        if (this.cost - productCost >= 0 && this.total - 1 >= 0) {
            this.updateCartInfo(this.cost - productCost, this.total - 1);
        }
    }

    addProduct(productCost: number) {
        this.updateCartInfo(this.cost + productCost, this.total + 1);
    }

    get totalProducts() {
        return this.total;
    }

    protected updateDiscountComponent() {
        if (this.props.discountInfo) {
            this.discount.setNewDiscount(
                this.props.discountInfo.minSum,
                this.props.discountInfo.benefitType,
                this.props.discountInfo.value,
                this.cost,
            );
        }
    }

    protected componentWillUnmount() {
        this.confirmButton.htmlElement.removeEventListener(
            'click',
            this.placeOrderListener,
        );
    }

    protected componentDidMount() {
        this.placeOrderListener = (e: Event) => {
            const target = e.target as Element;
            if (
                target.tagName.toLowerCase() === 'button' ||
                target.classList.contains('btn__text')
            ) {
                e.preventDefault();
                this.confirmButton.setDisabled();
                this.props.orderCreatedCallback();
                this.confirmButton.setEnabled();
            }
        };

        this.confirmButton.htmlElement.addEventListener(
            'click',
            this.placeOrderListener,
        );
    }

    protected render() {
        this.renderTemplate();

        this.costElement = this.htmlElement.getElementsByClassName(
            'cart-info__products-cost',
        )[0] as HTMLDivElement;

        this.totalElement = this.htmlElement.getElementsByClassName(
            'cart-info__total-items',
        )[0] as HTMLDivElement;

        this.totalCostElement = this.htmlElement.getElementsByClassName(
            'cart-info__total-cost',
        )[0] as HTMLDivElement;

        this.confirmButton = new Button(
            this.htmlElement.getElementsByClassName(
                'cart-info__confirm-btn-block',
            )[0],
            {
                className: 'confirm-btn',
                btnStyle: 'bright',
                btnText: 'Оформить заказ',
                type: 'button',
            },
        );

        this.discount = null;

        this.componentDidMount();
    }

    setDisabled() {
        this.confirmButton.setDisabled();
    }

    setEnabled() {
        this.confirmButton.setEnabled();
    }

    destroy() {
        this.componentWillUnmount();
        this.htmlElement.remove();
    }
}
