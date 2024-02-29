import { ajax } from "../../shared/api/ajax";
import { ProductItem } from "../../widgets/components/productItem/productItem";

export class Main {
    constructor(parent, name) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
    }

    render() {
        this.htmlElement = document.createElement('div');

        ajax('GET', '/feed', null, (status, responseString) => {
            const products = JSON.parse(responseString);
            if (products && Array.isArray(products)) {
                const h = document.createElement('h1');
                this.htmlElement.appendChild(h);
                h.innerText = 'Популярные'

                const div = document.createElement('div');
                this.htmlElement.appendChild(div);

                products.forEach(({name, cost}) => {
                    const productItemObj = new ProductItem(this, name, cost);
                    productItemObj.render();
                })
            }
        })

        this.parentItem.addChild(this.htmlElement)
    }
}