import buttonTmpl from './template.pug';
import { Component } from '@/shared/@types/component';
import './style.scss';

export interface ButtonProps {
    className: string;
    type: string;
    btnText: string;
    btnStyle: 'withOutline' | 'bright';
}

export class Button extends Component<HTMLButtonElement, ButtonProps> {
    /**
     * Button constructor
     * @param {Element} parent - parent element
     */
    constructor(parent: Element, props: ButtonProps) {
        super(parent, buttonTmpl, props);
    }

    setDisabled() {
        this.htmlElement.disabled = true;
    }

    setEnabled() {
        this.htmlElement.disabled = false;
    }
}
