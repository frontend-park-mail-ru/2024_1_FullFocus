import './index.style.scss';
import buttonTmpl from './index.template.pug';
import { ButtonProps } from './index.types';
import { Component } from '@/shared/@types/index.component';

export class Button extends Component<HTMLButtonElement, ButtonProps> {
    protected btnTextElement: HTMLSpanElement;
    protected btnIconElement: HTMLSpanElement;
    protected nextToggle: {
        btnText?: string;
        btnIconFunc?: (props?: object) => string;
    };
    protected currentToggle: {
        btnText?: string;
        btnIconFunc?: (props?: object) => string;
    };

    /**
     * Button constructor
     * @param {Element} parent - parent element
     */
    constructor(parent: Element, props: ButtonProps) {
        super(parent, buttonTmpl, props);
        this.nextToggle = null;
        if (this.props.toggle) {
            this.nextToggle = this.props.toggle;
            this.currentToggle = {
                btnText: this.props.btnText,
                btnIconFunc: this.props.btnIconFunc,
            };
        }
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
        this.htmlElement.classList.add('btn_disabled');
    }

    setEnabled() {
        this.htmlElement.disabled = false;
        this.htmlElement.classList.remove('btn_disabled');
    }

    protected render() {
        this.renderTemplate();

        this.btnTextElement = this.htmlElement.getElementsByClassName(
            'btn__text',
        )[0] as HTMLSpanElement;

        this.btnIconElement = this.htmlElement.getElementsByClassName(
            'btn__icon',
        )[0] as HTMLSpanElement;

        if (this.props.btnIconFunc) {
            this.btnIconElement.insertAdjacentHTML(
                'beforeend',
                this.props.btnIconFunc(),
            );
        }
    }

    toggle() {
        if (this.nextToggle) {
            this.textElement.innerText = this.nextToggle.btnText;
            this.btnIconElement.innerHTML = '';
            this.btnIconElement.insertAdjacentHTML(
                'beforeend',
                this.nextToggle.btnIconFunc(),
            );

            const temp = this.nextToggle;
            this.nextToggle = this.currentToggle;
            this.currentToggle = temp;
        }
    }
}
