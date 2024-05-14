import productsSectionTmpl from './index.template.pug';
import './index.style.scss';
import { Component } from '@/shared/@types/index.component';
import { ProductsListProps } from './index.types';
import { ProductsSectionItem } from './productsSectionItem';
import { addToCart } from '@/entities/cart/api';
import { List } from '@/shared/uikit/list';

export { ProductsSectionItem } from './productsSectionItem';

export class ProductsList<
    ProductCardType extends Component<Element>,
> extends Component<HTMLDivElement, ProductsListProps> {
    protected list: List<ProductsSectionItem<ProductCardType>>;
    protected listener: (e: Event) => void;

    constructor(parent: Element, props: ProductsListProps) {
        super(parent, productsSectionTmpl, props);
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
                    this.props.navigateToCart();
                }

                if (!this.productCardById(id).inCart) {
                    addToCart(id)
                        .then(({ status }) => {
                            if (status === 200) {
                                this.productCardById(id).setInCart();
                                this.htmlElement.dispatchEvent(
                                    new Event('updatenavbar', {
                                        bubbles: true,
                                    }),
                                );
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

        this.list = new List(this.htmlElement, {
            className: 'products-list__products',
            wrap: true,
            emptyText: 'товары отсутсвуют',
        });

        this.componentDidMount();
    }

    loadProducts(
        products: ((parent: Element) => {
            item: ProductsSectionItem<ProductCardType>;
            id: string;
        })[],
    ): void {
        this.list.renderItems(products);
    }

    productCardById(id: number) {
        return this.list.itemById(id.toString());
    }

    clear() {
        this.list.clear();
    }

    destroy(): void {
        this.clear();
        this.htmlElement.remove();
    }
}
