import inputTmpl from './template.pug';
import { Component } from '@/shared/@types/component';

export type InputType = 'password' | 'email' | 'text';

export type InputStatus = 'valid' | 'invalid' | 'notValidated';

export interface InputProps {
    className: string;
    placeholder: string;
    type: InputType;
    name: string;
    status: InputStatus;
}

export class Input extends Component<HTMLInputElement, InputProps> {
    /**
     * Input constructor
     */
    constructor(parent: Element, props: InputProps) {
        super(parent, inputTmpl, props);
    }

    setReadonly() {
        this.htmlElement.readOnly = true;
    }

    setNotReadonly() {
        this.htmlElement.readOnly = false;
    }

    setInvalid(): void {
        this.props.status = 'invalid';
        this.htmlElement.classList.remove('input-block__input_valid');
        this.htmlElement.classList.add('input-block__input_invalid');
    }

    setValid(): void {
        this.props.status = 'valid';
        this.htmlElement.classList.add('input-block__input_valid');
        this.htmlElement.classList.remove('input-block__input_invalid');
    }

    setNotValidated(): void {
        this.props.status = 'notValidated';
        this.htmlElement.classList.remove('input-block__input_valid');
        this.htmlElement.classList.remove('input-block__input_invalid');
    }

    get htmlInput(): HTMLInputElement {
        return this.htmlElement;
    }

    get inputValue(): string {
        return this.htmlInput.value;
    }
}
