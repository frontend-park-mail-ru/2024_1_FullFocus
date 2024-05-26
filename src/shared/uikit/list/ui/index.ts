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

    protected render() {
        this.renderTemplate();
        if (this.props.gap) {
            this.htmlElement.style.gap = this.props.gap;
        }
    }

    renderItems(
        items: ((parent: Element) => { item: ListItem; id: string })[],
    ) {
        this.clear();

        if (items.length !== 0) {
            items.forEach((createItem) => {
                this.pushItem(createItem);
            });
        }

        if (items.length === 0 && this.props.emptyText) {
            this.htmlElement.innerText = this.props.emptyText;
        }
    }

    pushItem(createItem: (parent: Element) => { item: ListItem; id: string }) {
        const { id, item } = createItem(this.htmlElement);
        this.items[id] = item;
    }

    clear() {
        Object.values(this.items).forEach((item) => {
            item.destroy();
        });
        this.items = {};
        this.htmlElement.innerText = '';
    }

    setEmptyText() {
        this.clear();
        this.htmlElement.innerText = this.props.emptyText;
    }

    itemById(id: string): ListItem {
        return this.items[id];
    }
}
