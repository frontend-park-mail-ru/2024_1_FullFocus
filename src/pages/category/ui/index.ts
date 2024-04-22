import categoryPageTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { CategoryPageProps } from './index.types';
import { useGetProductCardsCategory } from '@/features/product/ui';
import { ProductCard } from '@/entities/product';
import { ProductsList } from '@/entities/productsSection/ui/productsList';

export class CategoryPage extends Component<HTMLDivElement, CategoryPageProps> {
    protected productsSection: HTMLDivElement;
    protected category: HTMLSpanElement;
    protected productsList: ProductsList<ProductCard>;

    constructor(
        parent: Element,
        params: { categoryId: string; [name: string]: string },
    ) {
        super(parent, categoryPageTmpl, {
            className: 'category-page',
            categoryId: Number(params.categoryId),
        });
    }

    loadCategory(categoryId: number) {
        useGetProductCardsCategory(categoryId)
            .then((products) => {
                this.clearProducts();
                this.productsList.loadProducts(products);

                // TODO real name
                this.category.innerText = '[category name]';
            })
            .catch(() => {
                this.productsSection.innerText = 'Что-то пошло не так';
            });
    }

    clearProducts() {
        this.productsList.clear();
    }

    protected render() {
        this.renderTemplate();
        console.log(this.props.categoryId);

        this.productsSection = this.htmlElement.getElementsByClassName(
            'categories-main',
        )[0] as HTMLDivElement;

        this.category = this.htmlElement.getElementsByClassName(
            'categories-header__category',
        )[0] as HTMLSpanElement;

        this.productsList = new ProductsList(this.productsSection, {
            className: 'categories-main__products-list',
        });

        this.loadCategory(Number(this.props.categoryId));
    }
}
