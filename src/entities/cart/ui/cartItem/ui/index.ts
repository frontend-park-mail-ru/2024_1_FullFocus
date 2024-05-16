import './index.style.scss';
import cartItemTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { CartItemProps } from './index.types';
import { Counter } from '@/shared/uikit/counter/ui';

export class CartItem<
    ProductCardType extends Component<Element>,
> extends Component<HTMLDivElement, CartItemProps> {
    protected productCard: ProductCardType;
    protected counter: Counter;
    protected productId: number;

    constructor(parent: Element, props: CartItemProps) {
        super(parent, cartItemTmpl, props);
    }

    protected render() {
        this.renderTemplate();

        this.counter = new Counter(
            this.htmlElement.getElementsByClassName('cart-item__actions')[0],
            { className: 'cart-item__counter', initial: 0, size: 'xs' },
        );
    }

    insertProduct(
        getCard: (parent: Element) => {
            card: ProductCardType;
            id: number;
            count: number;
        },
    ) {
        const { card, id, count } = getCard(this.productPlace);
        this.productCard = card;
        this.productId = id;
        this.counter.htmlElement.setAttribute(
            'data-productid',
            this.productId.toString(),
        );
        this.counter.counterValue = count;
    }

    get productPlace() {
        return this.htmlElement.getElementsByClassName('cart-item__product')[0];
    }

    set counterValue(value: number) {
        this.counter.counterValue = value;
    }

    get currentCounterValue() {
        return this.counter.counterValue;
    }

    get id() {
        return this.productId;
    }

    get productCardItem() {
        return this.productCard;
    }

    destroy(): void {
        this.productCard.destroy();
        this.htmlElement.remove();
    }
}
