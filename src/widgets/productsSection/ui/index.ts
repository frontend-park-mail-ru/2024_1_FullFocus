import { useGetProductCards } from '@/features/product';
import './index.style.scss';
import productsSectionTmpl from './index.template.pug';
import { ProductsSectionProps } from './index.types';
import { Component } from '@/shared/@types/index.component';
import { ProductCard } from '@/entities/product';
import { useGetProductCardsCategory } from '@/features/product/ui';
import { CategoriesList } from './categoriesList';
import { ProductsSectionItem } from '@/entities/productsSection';
import { addToCart } from '@/entities/cart/api';

export class ProductsSection extends Component<
    HTMLDivElement,
    ProductsSectionProps
> {
    protected products: { [id: number]: ProductsSectionItem<ProductCard> };
    protected productsSection: HTMLDivElement;
    protected categoryName: HTMLSpanElement;
    protected productsCategories: CategoriesList;
    protected listener: (e: Event) => void;

    /**
     * Constructor for ProductsSection
     * @param {Element} parent - parent html element
     */
    constructor(parent: Element, props: ProductsSectionProps) {
        super(parent, productsSectionTmpl, props);
        this.products = [];
    }

    changeCategory(categoryId: number) {
        this.productsSection.innerHTML = '';
        useGetProductCardsCategory(categoryId)
            .then((products) => {
                this.renderCards(products);
                this.productsCategories.changeActiveItem(categoryId);
                this.categoryName.innerText =
                    'Категория: ' +
                    this.productsCategories.categoryNameById(categoryId);
            })
            .catch(() => {
                this.products = [];
                this.productsSection.innerText = 'что-то пошло не так';
            });
    }

    clearCategory() {
        this.productsSection.innerHTML = '';
        useGetProductCards(1, 10)
            .then((products) => {
                this.renderCards(products);
                this.categoryName.innerText = 'Все товары';
                this.productsCategories.clearActive();
            })
            .catch(() => {
                this.products = [];
                this.productsSection.innerText = 'что-то пошло не так';
            });
    }

    protected renderCards(
        products: ((parent: Element) => ProductsSectionItem<ProductCard>)[],
    ) {
        if (products.length === 0) {
            this.productsSection.innerText = 'товары отсутсвуют';
        }

        if (products.length !== 0) {
            products.forEach((product) => {
                const p = product(this.productsSection);
                this.products[p.id] = p;
            });
        }
    }

    protected componentDidMount() {
        this.listener = (e: Event) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'button' ||
                target.classList.contains('btn__text')
            ) {
                const id = Number(target.dataset.id);
                if (this.products[id].inCart) {
                    this.props.navigateToCart();
                }

                if (!this.products[id].inCart) {
                    addToCart(id)
                        .then(({ status }) => {
                            if (status === 200) {
                                this.products[id].setInCart();
                            }
                        })
                        .catch(() => {});
                }
            }
        };
        this.htmlElement.addEventListener('click', this.listener);
    }

    /**
     * Renders products section
     */
    protected render() {
        this.renderTemplate();

        this.categoryName = this.htmlElement.getElementsByClassName(
            'products-section__header',
        )[0] as HTMLSpanElement;
        this.productsSection = this.htmlElement.getElementsByClassName(
            'products-section__products',
        )[0] as HTMLDivElement;

        this.productsCategories = new CategoriesList(
            this.htmlElement.getElementsByClassName(
                'products-section__categories',
            )[0],
            {
                className: 'categories',
            },
        );

        this.componentDidMount();
    }

    destroy(): void {
        Object.values(this.products).forEach((product) => {
            product.destroy();
        });
        this.htmlElement.remove();
    }
}
