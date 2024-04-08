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

        this.productsSection = this.htmlElement.getElementsByClassName(
            'products-section__products',
        )[0] as HTMLDivElement;

        let categoriesLoadedCallback = () => {};
        let productsPromise;
        if (this.props.categoryId) {
            productsPromise = useGetProductCardsCategory(this.props.categoryId);
            categoriesLoadedCallback = () => {
                this.productsCategories.changeActiveItem(this.props.categoryId);
                (
                    this.htmlElement.getElementsByClassName(
                        'products-section__category-name',
                    )[0] as HTMLSpanElement
                ).innerText = this.productsCategories.categoryNameById(
                    this.props.categoryId,
                );
            };
        }
        if (!this.props.categoryId) {
            productsPromise = useGetProductCards(1, 10);
        }

        this.productsCategories = new CategoriesList(
            this.htmlElement.getElementsByClassName(
                'products-section__categories',
            )[0],
            {
                className: 'categories',
                categoriesLoadedCallback: categoriesLoadedCallback,
                activeItemId: this.props.categoryId,
            },
        );

        productsPromise
            .then((products) => {
                products.forEach((product) => {
                    const p = product(this.productsSection);
                    this.products[p.id] = p;
                });
            })
            .catch(() => {
                this.products = [];
            });

        this.componentDidMount();
    }

    destroy(): void {
        Object.values(this.products).forEach((product) => {
            product.destroy();
        });
        this.htmlElement.remove();
    }
}
