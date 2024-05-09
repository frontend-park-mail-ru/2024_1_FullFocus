import './index.style.scss';
import productItemTmpl from './index.template.pug';
import { IProduct } from '../model';
import { Component } from '@/shared/@types/index.component';
import { ProductProps } from './index.types';
import { Rating } from '@/shared/uikit/starRating';

export class ProductCard extends Component<HTMLDivElement, ProductProps> {
    productInfo: IProduct;
    rating: Rating;

    /**
     * Constructor for ProductCard
     * @param {Element} parent - parent object
     */
    constructor(parent: Element, props: ProductProps) {
        super(parent, productItemTmpl, props);
    }

    protected render() {
        this.renderTemplate();

        if (this.props.rating) {
            this.rating = new Rating(
                this.htmlElement.getElementsByClassName(
                    'product-card__info-top',
                )[0],
                {
                    className: 'rating-stars',
                    rating: this.props.rating,
                    maxRating: 5,
                    size: 16,
                    fullColorHex: '#FCD53F',
                    emptyColorHex: '#E2E6E9',
                    style: 'small',
                },
            );

            this.rating.htmlElement.classList.add('text_secondary');
        }
    }

    get price() {
        return this.props.price;
    }

    get id() {
        return this.props.id;
    }
}
