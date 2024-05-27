import './index.style.scss';
import inputTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';

export type InputType = 'password' | 'email' | 'text';

export type InputStatus = 'valid' | 'invalid' | 'notValidated';

export interface InputProps {
    className: string;
    placeholder: string;
    type: InputType;
    name: string;
    status?: InputStatus;
    initialValue?: string;
    maxLen?: number;
    size?: 'xs' | 'sm' | 'bg';
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
        this.htmlElement.classList.remove('input_valid');
        this.htmlElement.classList.add('input_invalid');
    }

    setValid(): void {
        this.props.status = 'valid';
        this.htmlElement.classList.add('input_valid');
        this.htmlElement.classList.remove('input_invalid');
    }

    setNotValidated(): void {
        this.props.status = 'notValidated';
        this.htmlElement.classList.remove('input_valid');
        this.htmlElement.classList.remove('input_invalid');
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
        this.props.initialValue = this.props.initialValue ?? '';
        this.props.status = this.props.status ?? 'notValidated';
        this.props.maxLen = this.props.maxLen ?? DEFAULT_MAX_LEN;
        this.props.size = this.props.size ?? 'bg';

        this.renderTemplate();

        this.componentDidMount();
    }
}
