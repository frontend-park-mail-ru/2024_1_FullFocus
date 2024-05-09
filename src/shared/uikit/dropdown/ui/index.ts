import { isClickOut } from '@/shared/lib/clickOut';
import './index.style.scss';
import dropDownTmpl from './index.template.pug';
import { DropDownProps } from './index.types';
import { Component } from '@/shared/@types/index.component';

export type { DropDownProps } from './index.types';

export class DropDown<
    DropDownItem extends Component<Element>,
> extends Component<HTMLElement, DropDownProps> {
    protected items: { [id: string]: DropDownItem };
    protected htmlTogglerSection: HTMLDivElement;
    protected htmlMainText: HTMLSpanElement;
    protected htmlItemsSection: HTMLDivElement;
    protected status: 'opened' | 'closed';

    constructor(parent: Element, props: DropDownProps) {
        super(parent, dropDownTmpl, props);
        this.items = {};
        this.status = 'closed';
    }

    mountToggler(element: HTMLElement) {
        element.addEventListener('click', () => {
            this.toggle();
        });
    }

    show() {
        this.status = 'opened';
        this.htmlElement.classList.remove('dropdown_hidden');
    }

    hide() {
        this.status = 'closed';
        this.htmlElement.classList.add('dropdown_hidden');
    }

    toggle() {
        const dropdownOpened = this.opened;

        if (dropdownOpened) {
            this.hide();
        }

        if (!dropdownOpened) {
            this.show();
        }
    }

    renderItems(
        items: ((parent: Element) => { item: DropDownItem; id: string })[],
    ) {
        this.clear();

        if (items.length !== 0) {
            items.forEach((createItem) => {
                this.addItem(createItem);
            });
        }
    }

    addItem(
        createItem: (parent: Element) => { item: DropDownItem; id: string },
    ) {
        const { id, item } = createItem(this.htmlItemsSection);
        item.htmlElement.classList.add('dropdown-item');
        this.items[id] = item;
    }

    clear() {
        Object.values(this.items).forEach((item) => {
            item.destroy();
        });
        this.items = {};
        this.setDefaultText();
    }

    itemById(id: string): DropDownItem {
        return this.items[id];
    }

    setDefaultText() {
        if (this.props.defaultText) {
            this.mainText = this.props.defaultText;
        }
    }

    set mainText(text: string) {
        if (this.props.defaultText) {
            this.htmlMainText.innerText = text;
        }
    }

    get opened() {
        return this.status === 'opened';
    }

    protected componentDidMount() {
        this.htmlElement.addEventListener('click', () => {
            this.toggle();
        });

        document.addEventListener('click', (e: MouseEvent) => {
            if (this.opened && isClickOut(this.htmlElement, e)) {
                this.hide();
            }
        });
    }

    protected render() {
        this.props.size = this.props.size ?? 'xs';
        this.props.border = this.props.border ?? true;

        this.renderTemplate();

        this.htmlTogglerSection = this.htmlElement.getElementsByClassName(
            'dropdown__toggler',
        )[0] as HTMLDivElement;

        this.htmlItemsSection = this.htmlElement.getElementsByClassName(
            'dropdown__items',
        )[0] as HTMLDivElement;

        this.htmlMainText = this.htmlElement.getElementsByClassName(
            'dropdown__main-text',
        )[0] as HTMLSpanElement;

        this.componentDidMount();
    }
}
