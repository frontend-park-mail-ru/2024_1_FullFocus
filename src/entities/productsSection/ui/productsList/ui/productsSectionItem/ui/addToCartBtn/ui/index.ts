import './index.style.scss';
import addToCartItemTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { Button } from '@/shared/uikit/button';
import { Counter } from '@/shared/uikit/counter';
import { AddToCartBtnProps } from './index.types';

export class AddToCartBtn extends Component<HTMLDivElement, AddToCartBtnProps> {
    protected addToCartBtn: Button;
    protected counter: Counter;

    constructor(parent: Element, props: AddToCartBtnProps) {
        super(parent, addToCartItemTmpl, props);
    }

    get btn() {
        return this.addToCartBtn;
    }

    get counterItem() {
        return this.counter;
    }

    get inCart() {
        return this.props.amount !== 0;
    }

    set counterValue(value: number) {
        this.counter.counterValue = value;
    }

    setInCart(amount: number) {
        if (amount > 0) {
            this.props.amount = amount;
            this.counterValue = amount;
            this.addToCartBtn.hide();
            this.counter.show();
        }
    }

    setNotInCart() {
        this.props.amount = 0;
        this.counterValue = 0;
        this.addToCartBtn.show();
        this.counter.hide();
    }

    setDisabled() {
        this.addToCartBtn.setDisabled();
        this.counter.setDisabled();
    }

    setEnabled() {
        this.addToCartBtn.setEnabled();
        this.counter.setEnabled();
    }

    setLoading() {
        this.htmlElement.classList.add('add-to-cart-item--loading');
    }

    removeLoading() {
        this.htmlElement.classList.remove('add-to-cart-item--loading');
    }

    protected render() {
        this.renderTemplate();

        this.addToCartBtn = new Button(this.htmlElement, {
            className: 'add-to-cart-item__to-cart-btn',
            btnStyle: 'bright',
            btnText: 'Добавить',
            type: 'button',
            size: 'xs',
        });

        this.counter = new Counter(this.htmlElement, {
            className: 'add-to-cart-item__counter',
            initial: 0,
            size: 'xs',
        });

        this.props.amount = this.props.amount ?? 0;

        const inCart = this.inCart;

        if (inCart) {
            this.setInCart(this.props.amount);
        }

        if (!inCart) {
            this.setNotInCart();
        }
    }
}
