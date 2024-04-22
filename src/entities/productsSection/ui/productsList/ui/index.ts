import productsSectionTmpl from './index.template.pug';
import './index.style.scss';
import { Component } from '@/shared/@types/index.component';
import { ProductsListProps } from './index.types';
import { ProductsSectionItem } from './productsSectionItem';
import { addToCart } from '@/entities/cart/api';

export { ProductsSectionItem } from './productsSectionItem';

export class ProductsList<
    ProductCardType extends Component<Element>,
> extends Component<HTMLDivElement, ProductsListProps> {
    protected products: { [id: number]: ProductsSectionItem<ProductCardType> };
    protected listener: (e: Event) => void;

    constructor(parent: Element, props: ProductsListProps) {
        super(parent, productsSectionTmpl, props);
        this.products = {};
    }

    protected componentDidMount() {
        this.listener = (e: Event) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'button' ||
                target.classList.contains('btn__text')
            ) {
                const id = Number(target.dataset.id);
                if (this.productCardById(id).inCart) {
                    // this.props.navigateToCart();
                    console.log('to cart!');
                }

                if (!this.productCardById(id).inCart) {
                    addToCart(id)
                        .then(({ status }) => {
                            if (status === 200) {
                                this.productCardById(id).setInCart();
                            }
                        })
                        .catch(() => {});
                }
            }
        };
        this.htmlElement.addEventListener('click', this.listener);
    }

    protected render() {
        this.renderTemplate();
        this.componentDidMount();
    }

    loadProducts(
        products: ((parent: Element) => {
            card: ProductsSectionItem<ProductCardType>;
            id: number;
        })[],
    ): void {
        this.clear();

        if (products.length === 0) {
            this.htmlElement.innerText = 'товары отсутсвуют';
        }

        if (products.length !== 0) {
            products.forEach((product) => {
                const { id, card } = product(this.htmlElement);
                this.products[id] = card;
            });
        }
    }

    productCardById(id: number) {
        return this.products[id];
    }

    clear() {
        Object.values(this.products).forEach((product) => {
            product.destroy();
        });
        this.products = {};
    }

    destroy(): void {
        this.clear();
        this.htmlElement.remove();
    }
}
