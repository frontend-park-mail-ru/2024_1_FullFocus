import './index.style.scss';
import { Button } from '@/shared/uikit/button';
import newCodeTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { Input } from '@/shared/uikit/input';
import { DropDown } from '@/shared/uikit/dropdown';
import { MAX_PROMOCODE_LEN, PromocodeCard } from '@/entities/promocode';
import { useGetPromocodesDropdown } from '@/features/promocodes';

export class NewCode extends Component<HTMLDivElement> {
    submitBtn: Button;
    input: Input;
    dropdown: DropDown<PromocodeCard>;
    formElement: HTMLFormElement;

    constructor(parent: Element, props: { className: string }) {
        super(parent, newCodeTmpl, props);
    }

    protected render() {
        this.renderTemplate();
        this.dropdown = useGetPromocodesDropdown(
            this.htmlElement.getElementsByClassName(
                'new-code__dropdown-container',
            )[0],
            'new-code__dropdown',
        );

        this.formElement = this.htmlElement.getElementsByClassName(
            'new-code__new-code-form',
        )[0] as HTMLFormElement;

        this.input = new Input(this.formElement, {
            className: 'new-code__input',
            placeholder: 'Новый промокод',
            type: 'text',
            name: 'promocode',
            size: 'xs',
            maxLen: MAX_PROMOCODE_LEN,
        });

        this.submitBtn = new Button(this.formElement, {
            className: 'new-code__new-code-submit',
            btnStyle: 'bright',
            type: 'submit',
            btnText: 'Применить',
            size: 'xs-only',
        });
    }

    destroy() {
        this.dropdown.destroy();
        this.dropdown = null;
        this.input.destroy();
        this.input = null;
        this.submitBtn.destroy();
        this.submitBtn = null;
        this.formElement.remove();
        this.formElement = null;
        this.htmlElement.remove();
    }
}
