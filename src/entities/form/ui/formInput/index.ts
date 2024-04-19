import './index.style.scss';
import formInputTmpl from './index.template.pug';
import { Input, InputType, InputStatus } from '@/shared/uikit/input';
import { EmptyContainer } from '@/shared/uikit/emptyContainer';
import { getEyeBtn } from '@/shared/uikit/button';
import { Component } from '@/shared/@types/index.component';

export interface FormInputProps {
    className: string;
    inputClassName: string;
    placeholder: string;
    type: InputType;
    name: string;
    status: InputStatus;
    errorBlockClassName: string;
    validate?: boolean;
    initialValue?: string;
}

export class FormInput extends Component<HTMLDivElement, FormInputProps> {
    props: FormInputProps;
    input: Input;
    protected errorBlock: EmptyContainer;
    protected inputBlock: HTMLDivElement;

    constructor(parent: Element, props: FormInputProps) {
        super(parent, formInputTmpl, props);
    }

    get validate() {
        if (this.props.validate != undefined) {
            return this.props.validate;
        }
        return true;
    }

    protected render() {
        this.renderTemplate();

        this.inputBlock = this.htmlElement.getElementsByClassName(
            'input-block',
        )[0] as HTMLDivElement;

        this.input = new Input(this.inputBlock, {
            className: this.props.inputClassName,
            placeholder: this.props.placeholder,
            type: this.props.type,
            name: this.props.name,
            status: this.props.status,
            initialValue: this.props.initialValue,
        });

        if (this.props.type === 'password') {
            const btnItem = getEyeBtn(this.inputBlock, {
                type: 'button',
                className: 'hide-show-password-btn',
                btnStyle: 'white',
            });

            const btn = btnItem.htmlElement;

            btn.addEventListener('click', () => {
                // const target = e.target as HTMLButtonElement;
                if (this.props.type === 'password') {
                    this.props.type = 'text';
                    btnItem.toggle();
                } else {
                    this.props.type = 'password';
                    btnItem.toggle();
                }
                this.input.htmlElement.type = this.props.type;
            });
        }

        this.errorBlock = new EmptyContainer(this.htmlElement, {
            className:
                this.props.errorBlockClassName +
                ' text_size-small text_weight-semibold',
        });

        this.errorBlock.htmlElement.hidden = true;
    }

    addError(error: string) {
        this.htmlErrorBlock.hidden = false;
        this.inputBlock.classList.remove('input-block_valid');
        this.inputBlock.classList.add('input-block_invalid');
        this.htmlErrorBlock.textContent = error;
    }

    setValid() {
        this.htmlErrorBlock.hidden = true;
        this.inputBlock.classList.add('input-block_valid');
        this.inputBlock.classList.remove('input-block_invalid');
        this.htmlErrorBlock.textContent = '';
    }

    clearErrors() {
        this.htmlErrorBlock.hidden = true;
        this.inputBlock.classList.remove('input-block_valid');
        this.inputBlock.classList.remove('input-block_invalid');
        this.htmlErrorBlock.textContent = '';
    }

    get htmlErrorBlock() {
        return this.errorBlock.htmlElement;
    }

    get htmlInput() {
        return this.input.htmlElement;
    }
}
