import './index.style.scss';
import listTmpl from './index.template.pug';
import { ListProps } from './index.types';
import { Component } from '@/shared/@types/index.component';

export class List<ListItem extends Component<Element>> extends Component<
    HTMLElement,
    ListProps
> {
    protected items: { [id: string]: ListItem };

    constructor(parent: Element, props: ListProps) {
        super(parent, listTmpl, props);
        this.items = {};
    }

    renderItems(
        items: ((parent: Element) => { item: ListItem; id: string })[],
    ) {
        this.clear();

        if (items.length !== 0) {
            items.forEach((createItem) => {
                const { id, item } = createItem(this.htmlElement);
                this.items[id] = item;
            });
        }

        if (items.length === 0 && this.props.emptyText) {
            this.htmlElement.innerText = this.props.emptyText;
        }
    }

    clear() {
        Object.values(this.items).forEach((item) => {
            item.destroy();
        });
        this.items = {};
        this.htmlElement.innerText = '';
    }
}
