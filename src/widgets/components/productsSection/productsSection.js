import productsSectionTmpl from './productsSection.pug'
import { domFromHtml } from '../../../shared/lib/domFromHtml/domFromHtml';
import { ajax } from '../../../shared/api/ajax';
import { ProductCard } from './productCard/productCard';

export class ProductsSection {
    constructor() {

    }

    render() {
        const component = domFromHtml(productsSectionTmpl());
        ajax('GET', '/feed', null, (status, responseString) => {
            const products = JSON.parse(responseString);
            if (products && Array.isArray(products)) {
                products.forEach(({name, cost}) => {
                    const productCardObj = new ProductCard(this, name, cost);
                    component.appendChild(productCardObj.render());
                })
            }
        })
        return component;
    }
}