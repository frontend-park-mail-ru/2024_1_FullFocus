import './index.style.scss';
import tmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProductInOrderCardProps } from './index.types';

export class ProductInOrderCard<ProductCardType> extends Component<
    HTMLDivElement,
    ProductInOrderCardProps
> {
    protected productCard: ProductCardType;

    constructor(parent: Element, props: ProductInOrderCardProps) {
        super(parent, tmpl, props);
    }

    insertProductCard(getCard: (parent: Element) => ProductCardType) {
        this.productCard = getCard(
            this.htmlElement.getElementsByClassName(
                'product-in-order__product-place',
            )[0],
        );
    }
}
