import { Input, InputType, InputStatus } from '@/shared/uikit/input';
import { EmptyContainer } from '@/shared/uikit/emptyContainer';
import { Button } from '@/shared/uikit/button';

export interface FormInputProps {
    className: string;
    inputClassName: string;
    placeholder: string;
    type: InputType;
    name: string;
    status: InputStatus;
    errorBlockClassName: string;
}

export class FormInput extends EmptyContainer {
    props: FormInputProps;
    input: Input;
    protected errorBlock: EmptyContainer;

    constructor(parent: Element, props: FormInputProps) {
        super(parent, props);
    }

    protected render() {
        this.renderTemplate();

        this.input = new Input(this.htmlElement, {
            className: this.props.inputClassName,
            placeholder: this.props.placeholder,
            type: this.props.type,
            name: this.props.name,
            status: this.props.status,
        });

        if (this.props.type === 'password') {
            const btnItem = new Button(this.htmlElement, {
                type: 'button',
                className: 'hide-show-password-btn',
                btnText: 'show',
                btnStyle: 'withOutline',
            });

            const btn = btnItem.htmlElement;

            btn.addEventListener('click', (e) => {
                const target = e.target as HTMLButtonElement;
                if (this.props.type === 'password') {
                    this.props.type = 'text';
                    target.textContent = 'hide';
                } else {
                    this.props.type = 'password';
                    target.textContent = 'show';
                }
                this.input.htmlElement.type = this.props.type;
            });
        }

        this.errorBlock = new EmptyContainer(this.htmlElement, {
            className: this.props.errorBlockClassName,
        });

        this.errorBlock.htmlElement.hidden = true;
    }

    addError(error: string) {
        this.htmlErrorBlock.hidden = false;
        this.input.setInvalid();
        this.htmlErrorBlock.textContent = error;
    }

    clearErrors() {
        this.htmlErrorBlock.hidden = true;
        this.input.setNotValidated();
        this.htmlErrorBlock.textContent = '';
    }

    get htmlErrorBlock() {
        return this.errorBlock.htmlElement;
    }

    get htmlInput() {
        return this.input.htmlElement;
    }
}
