import './index.style.scss';
import popupTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { Coords, PopupProps } from './index.types';

export class Popup<
    Inner extends Component<Element> = Component<Element>,
> extends Component<HTMLDivElement, PopupProps> {
    protected innerComponent: Inner;
    protected shown: boolean;

    constructor(parent: Element, props: PopupProps) {
        super(parent, popupTmpl, props);
    }

    get inner() {
        return this.innerComponent;
    }

    get isShown() {
        return this.shown;
    }

    setNewInner(newInner: (parent: Element) => Inner) {
        if (this.innerComponent) {
            this.innerComponent.destroy();
            this.htmlElement.innerHTML = '';
        }
        this.innerComponent = newInner(this.htmlElement);
    }

    show() {
        this.htmlElement.classList.add('popup_shown');
        this.htmlElement.classList.remove('popup_hidden');
    }

    hide() {
        this.htmlElement.classList.remove('popup_shown');
        this.htmlElement.classList.add('popup_hidden');
    }

    position(coords: Coords) {
        if (coords.top) {
            this.htmlElement.style.top = coords.top;
            this.htmlElement.style.bottom = '';
        }

        if (coords.bottom) {
            this.htmlElement.style.bottom = coords.bottom;
            this.htmlElement.style.top = '';
        }

        if (coords.left) {
            this.htmlElement.style.left = coords.left;
            this.htmlElement.style.right = '';
        }

        if (coords.right) {
            this.htmlElement.style.right = coords.right;
            this.htmlElement.style.left = '';
        }
    }
}
