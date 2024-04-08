import './index.style.scss';
import buttonTmpl from './index.template.pug';
import { ButtonProps } from './index.types';
import { Component } from '@/shared/@types/index.component';

export class Button extends Component<HTMLButtonElement, ButtonProps> {
    protected btnTextElement: HTMLSpanElement;

    /**
     * Button constructor
     * @param {Element} parent - parent element
     */
    constructor(parent: Element, props: ButtonProps) {
        super(parent, buttonTmpl, props);
    }

    set btnText(text: string) {
        this.btnTextElement.innerText = text;
    }

    get textElement() {
        return this.btnTextElement;
    }

    hide() {
        this.htmlElement.hidden = true;
    }

    show() {
        this.htmlElement.hidden = false;
    }

    setDisabled() {
        this.htmlElement.disabled = true;
    }

    setEnabled() {
        this.htmlElement.disabled = false;
    }

    protected render() {
        this.renderTemplate();

        this.btnTextElement = this.htmlElement.getElementsByClassName(
            'btn__text',
        )[0] as HTMLSpanElement;
    }
}
