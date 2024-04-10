import { Component } from '@/shared/@types/index.component';
import './index.style.scss';
import cartInfoTmpl from './index.template.pug';
import { CartInfoProps } from './index.types';
import { Button } from '@/shared/uikit/button';

export class CartInfo extends Component<HTMLDivElement, CartInfoProps> {
    protected confirmButton: Button;
    protected cost: number;
    protected total: number;
    protected costElement: HTMLDivElement;
    protected totalElement: HTMLDivElement;
    protected placeOrderListener: (e: Event) => void;

    constructor(parent: Element, props: CartInfoProps) {
        super(parent, cartInfoTmpl, props);
    }

    updateCartInfo(cost: number, total: number) {
        this.cost = cost;
        this.total = total;
        this.costElement.innerText = this.cost.toString();
        this.totalElement.innerText = this.total.toString();
    }

    substractProduct(productCost: number) {
        if (this.cost - productCost >= 0 && this.total - 1 >= 0) {
            this.updateCartInfo(this.cost - productCost, this.total - 1);
        }
    }

    addProduct(productCost: number) {
        this.updateCartInfo(this.cost + productCost, this.total + 1);
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
                this.props.navigateToMainPage();
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
            'cart-info__total-sum',
        )[0] as HTMLDivElement;
        this.totalElement = this.htmlElement.getElementsByClassName(
            'cart-info__total-items',
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

        this.componentDidMount();
    }

    destroy() {
        this.componentWillUnmount();
        this.htmlElement.remove();
    }
}
