import inputTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';

export type InputType = 'password' | 'email' | 'text';

export type InputStatus = 'valid' | 'invalid' | 'notValidated';

export interface InputProps {
    className: string;
    placeholder: string;
    type: InputType;
    name: string;
    status: InputStatus;
    initialValue?: string;
    maxLen?: number;
}

const DEFAULT_MAX_LEN = 100;

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
        this.htmlElement.classList.remove('input-block_valid');
        this.htmlElement.classList.add('input-block_invalid');
    }

    setValid(): void {
        this.props.status = 'valid';
        this.htmlElement.classList.add('input-block_valid');
        this.htmlElement.classList.remove('input-block_invalid');
    }

    setNotValidated(): void {
        this.props.status = 'notValidated';
        this.htmlElement.classList.remove('input-block_valid');
        this.htmlElement.classList.remove('input-block_invalid');
    }

    get htmlInput(): HTMLInputElement {
        return this.htmlElement;
    }

    get inputValue(): string {
        return this.htmlInput.value;
    }

    set inputValue(string) {
        this.htmlInput.value = string;
    }

    protected componentDidMount() {
        this.htmlElement.addEventListener('input', () => {
            if (this.inputValue.length > this.props.maxLen) {
                this.inputValue = this.inputValue.substring(
                    0,
                    this.props.maxLen,
                );
            }
        });
    }

    protected render() {
        this.props.initialValue = this.props.initialValue
            ? this.props.initialValue
            : '';

        this.props.maxLen = this.props.maxLen
            ? this.props.maxLen
            : DEFAULT_MAX_LEN;

        this.renderTemplate();

        this.componentDidMount();
    }
}
