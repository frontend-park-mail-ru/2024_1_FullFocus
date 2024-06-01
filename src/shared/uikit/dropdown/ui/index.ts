import './index.style.scss';
import dropDownTmpl from './index.template.pug';
import './index.emptybg.svg';
import { isClickOut } from '@/shared/lib/clickOut';
import { DropDownProps } from './index.types';
import { Component } from '@/shared/@types/index.component';

export type { DropDownProps } from './index.types';

const FIRST_OPEN_EVENT_NAME = 'firstopen';

export class DropDown<
    DropDownItem extends Component<Element>,
> extends Component<HTMLElement, DropDownProps> {
    protected items: { [id: string]: DropDownItem };
    protected htmlTogglerSection: HTMLDivElement;
    protected htmlMainText: HTMLSpanElement;
    protected htmlItemsSection: HTMLDivElement;
    protected wasOpened: boolean;
    protected status: 'opened' | 'closed';
    protected enabled: boolean;

    constructor(parent: Element, props: DropDownProps) {
        super(parent, dropDownTmpl, props);
        this.items = {};
        this.status = 'closed';
        this.wasOpened = false;
        this.enabled = true;
    }

    startLoading() {
        this.htmlElement.classList.add('dropdown--loading');
    }

    stopLoading() {
        this.htmlElement.classList.remove('dropdown--loading');
    }

    addEmptyBg() {
        this.htmlElement.classList.add('dropdown-with-empty-bg');
    }

    removeEmptyBg() {
        this.htmlElement.classList.remove('dropdown-with-empty-bg');
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

    setUnopened() {
        this.wasOpened = false;
    }

    setDisabled() {
        this.htmlElement.classList.add('dropdown_disabled');
        this.enabled = false;
    }

    setEnabled() {
        this.htmlElement.classList.remove('dropdown_disabled');
        this.enabled = true;
    }

    set mainText(text: string) {
        if (this.props.defaultText) {
            this.htmlMainText.innerText = text;
        }
    }

    get opened() {
        return this.status === 'opened';
    }

    get firstOpenEventName() {
        return FIRST_OPEN_EVENT_NAME;
    }

    get dropDownItemsElement() {
        return this.htmlItemsSection;
    }

    protected componentDidMount() {
        this.htmlElement.addEventListener('click', () => {
            if (!this.enabled) return;

            this.toggle();
            if (this.props.dispatchOpenEvent && !this.wasOpened) {
                this.htmlElement.dispatchEvent(
                    new Event(FIRST_OPEN_EVENT_NAME),
                );
                this.wasOpened = true;
            }
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
        this.props.dispatchOpenEvent = this.props.dispatchOpenEvent ?? false;

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
