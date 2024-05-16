import './index.style.scss';
import productsSectionItemTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProductsSectionItemProps } from './index.types';
import { AddToCartBtn } from './addToCartBtn';

export { AddToCartBtn };

export class ProductsSectionItem<
    ProductCardType extends Component<Element>,
> extends Component<HTMLDivElement, ProductsSectionItemProps> {
    protected productCardDiv: HTMLDivElement;
    protected productCard: ProductCardType;
    protected addToCartItem: AddToCartBtn;
    protected btnListener: (e: Event) => void;
    protected productId: number;

    constructor(parent: Element, props: ProductsSectionItemProps) {
        super(parent, productsSectionItemTmpl, props);
    }

    get id() {
        return this.productId;
    }

    get inCart() {
        return this.addToCartItem.inCart;
    }

    set counterValue(value: number) {
        this.addToCartItem.counterValue = value;
    }

    setInCart(amount: number) {
        this.addToCartItem.setInCart(amount);
    }

    setNotInCart() {
        this.addToCartItem.setNotInCart();
    }

    setLoading() {
        this.addToCartItem.setLoading();
    }

    removeLoading() {
        this.addToCartItem.removeLoading();
    }

    setEnabled() {
        this.addToCartItem.setEnabled();
    }

    setDisabled() {
        this.addToCartItem.setDisabled();
    }

    insertProductCard(
        getCard: (parent: Element) => { product: ProductCardType; id: number },
    ) {
        this.productCardDiv.innerHTML = '';
        const { product, id } = getCard(this.productCardDiv);
        this.productCard = product;
        this.productId = id;
        this.htmlElement.setAttribute('data-id', id.toString());
    }

    protected render() {
        this.renderTemplate();

        this.productCardDiv = this.htmlElement.getElementsByClassName(
            'products-section-item__product-card',
        )[0] as HTMLDivElement;

        this.addToCartItem = new AddToCartBtn(this.htmlElement, {
            className: 'products-section-item__actions',
            amount: this.props.amount,
        });
    }
}
