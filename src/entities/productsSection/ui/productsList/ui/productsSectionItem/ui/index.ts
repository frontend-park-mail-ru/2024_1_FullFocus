import './index.style.scss';
import productsSectionItemTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProductsSectionItemProps } from './index.types';
import { Button } from '@/shared/uikit/button';

export class ProductsSectionItem<
    ProductCardType extends Component<Element>,
> extends Component<HTMLDivElement, ProductsSectionItemProps> {
    protected addToCartBtn: Button;
    protected productCardDiv: HTMLDivElement;
    protected productCard: ProductCardType;
    protected btnListener: (e: Event) => void;
    protected productId: number;

    constructor(parent: Element, props: ProductsSectionItemProps) {
        super(parent, productsSectionItemTmpl, props);
    }

    get id() {
        return this.productId;
    }

    get inCart() {
        return this.props.isInCart;
    }

    setInCart() {
        this.props.isInCart = true;
        this.addToCartBtn.btnText = 'Перейти в корзину';
    }

    setNotInCart() {
        this.props.isInCart = false;
        this.addToCartBtn.btnText = 'В корзину';
    }

    insertProductCard(
        getCard: (parent: Element) => { product: ProductCardType; id: number },
    ) {
        this.productCardDiv.innerHTML = '';
        const { product, id } = getCard(this.productCardDiv);
        this.productCard = product;
        this.productId = id;
        this.addToCartBtn.htmlElement.setAttribute('data-id', id.toString());
        this.addToCartBtn.textElement.setAttribute('data-id', id.toString());
    }

    protected render() {
        this.renderTemplate();

        this.productCardDiv = this.htmlElement.getElementsByClassName(
            'products-section-item__product-card',
        )[0] as HTMLDivElement;

        this.addToCartBtn = new Button(this.htmlElement, {
            className: 'products-section-item__to-cart-btn',
            btnStyle: 'bright',
            btnText: '',
            type: 'button',
            size: 'xs',
        });

        if (this.props.isInCart) {
            this.setInCart();
        }
        if (!this.props.isInCart) {
            this.setNotInCart();
        }
    }
}
