import './index.style.scss';
import formInputTmpl from './index.template.pug';
import { Input, InputType, InputStatus } from '@/shared/uikit/input';
import { EmptyContainer } from '@/shared/uikit/emptyContainer';
import { Button, getExitBtn, getEyeBtn } from '@/shared/uikit/button';
import { Component } from '@/shared/@types/index.component';
import { unformatPhoneNumber, usePhoneNumberMask } from '../../lib';

export interface FormInputProps {
    className: string;
    inputClassName: string;
    placeholder: string;
    type: InputType;
    name: string;
    status: InputStatus;
    errorBlockClassName: string;
    validate?: boolean;
    header?: boolean;
    initialValue?: string;
    size?: 'xs' | 'sm' | 'bg';
}

export class FormInput extends Component<HTMLDivElement, FormInputProps> {
    props: FormInputProps;
    input: Input;
    protected errorBlock: EmptyContainer;
    protected clearBtn: Button;
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

    protected restoreInitialValue() {
        this.input.inputValue = this.props.initialValue;
        if (this.props.name === 'phoneNumber') usePhoneNumberMask(this.input);
    }

    protected componentDidMount() {
        if (this.clearBtn) {
            this.input.htmlElement.addEventListener('input', () => {
                const currentValue =
                    this.props.name === 'phoneNumber'
                        ? unformatPhoneNumber(this.input.inputValue)
                        : this.input.inputValue;

                if (currentValue !== this.props.initialValue) {
                    this.showClearBtn();
                }

                if (currentValue === this.props.initialValue) {
                    this.hideClearBtn();
                }
            });

            this.clearBtn.htmlElement.addEventListener('click', () => {
                this.hideClearBtn();
                this.restoreInitialValue();
            });
        }
    }

    protected render() {
        this.props.header = this.props.header ?? false;

        this.renderTemplate();

        if (this.props.header) {
            (
                this.htmlElement.getElementsByClassName(
                    'input-header',
                )[0] as HTMLDivElement
            ).innerText = this.props.placeholder;
        }

        this.inputBlock = this.htmlElement.getElementsByClassName(
            'input-block',
        )[0] as HTMLDivElement;

        this.input = new Input(this.inputBlock, {
            className: this.props.inputClassName,
            placeholder: this.props.header ? '' : this.props.placeholder,
            type: this.props.type,
            name: this.props.name,
            status: this.props.status,
            initialValue: this.props.initialValue,
            size: this.props.size,
        });

        if (this.props.type === 'password') {
            const btnItem = getEyeBtn(this.inputBlock, {
                type: 'button',
                className: 'hide-show-password-btn',
                btnStyle: 'white',
                size: this.props.size,
            });

            const btn = btnItem.htmlElement;

            btn.addEventListener('click', () => {
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

        if (this.props.name === 'phoneNumber') {
            if (this.props.initialValue) {
                this.restoreInitialValue();
            }
            if (!this.props.initialValue) {
                this.input.inputValue = '+7';
            }
            this.htmlElement.addEventListener('input', () => {
                usePhoneNumberMask(this.input);
            });
        }

        if (this.props.initialValue && this.props.type !== 'password') {
            this.clearBtn = getExitBtn(this.inputBlock, {
                className: 'clear-btn',
                type: 'button',
                size: 'xs-only',
                btnStyle: 'white',
            });
            this.hideClearBtn();
        }

        this.errorBlock = new EmptyContainer(this.htmlElement, {
            className:
                this.props.errorBlockClassName +
                ' text_size-xs text_weight-semibold',
        });

        this.errorBlock.htmlElement.hidden = true;

        this.componentDidMount();
    }

    protected hideClearBtn() {
        this.clearBtn.hide();
        this.clearBtn.setDisabled();
    }

    protected showClearBtn() {
        this.clearBtn.show();
        this.clearBtn.setEnabled();
    }

    addError(error: string) {
        this.htmlErrorBlock.hidden = false;
        this.setInValid();
        this.htmlErrorBlock.textContent = error;
    }

    setValid() {
        this.htmlErrorBlock.hidden = true;
        this.inputBlock.classList.add('input-block_valid');
        this.inputBlock.classList.remove('input-block_invalid');
        this.htmlErrorBlock.textContent = '';
    }

    setInValid() {
        this.inputBlock.classList.remove('input-block_valid');
        this.inputBlock.classList.add('input-block_invalid');
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
