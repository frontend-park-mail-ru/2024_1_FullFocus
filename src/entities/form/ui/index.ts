import formTmpl from './index.template.pug';
import './index.style.scss';
import { Button } from '@/shared/uikit/button';
import { Component } from '@/shared/@types/index.component';
import { FormInput, FormInputProps } from './formInput';
import { FormProps, InputItems, IFormField } from './index.types';

export type { IFormField } from './index.types';

export class Form extends Component<HTMLFormElement, FormProps> {
    inputItems: InputItems;
    submitBtn: Button;
    inputsContainer: HTMLDivElement;

    /**
     * Form class constructor
     * @param {Element} parent - parent html element
     * @param {string} className - class associated with a form
     * @param {string} submitText - text for a submit button
     */
    constructor(
        parent: Element,
        className: string,
        submitText: string = 'Submit',
    ) {
        super(parent, formTmpl, {
            className: className,
            submitText,
        });

        this.inputItems = {};
    }

    /**
     * Add field to form
     * @param {string} name - name of the html input
     * @param {string} text - placeholder text for input
     * @param {InputType} type - html type of input
     * @param {string} className - html element class
     */
    addInputBlock(params: IFormField) {
        const props: FormInputProps = {
            placeholder: params.text,
            type: params.type,
            className: params.className,
            inputClassName: params.inputClassName,
            name: params.name,
            status: 'notValidated',
            validate: params.validate,
            initialValue: params.initialValue,
            errorBlockClassName:
                'input-block__error ' + params.className + '-error',
        };

        this.inputItems[params.name] = new FormInput(
            this.inputsContainer,
            props,
        );
    }

    /**
     * Render Form element
     */
    protected render() {
        this.renderTemplate();

        this.inputsContainer = this.htmlElement.getElementsByClassName(
            'form__inputs',
        )[0] as HTMLDivElement;

        this.submitBtn = new Button(this.htmlElement, {
            type: 'submit',
            className: 'btn-submit',
            btnText: this.props.submitText,
            btnStyle: 'bright',
        });
    }

    setReadonly() {
        Object.values(this.inputItems).forEach((input) => {
            // TODO add style for blocked input
            input.input.setReadonly();
        });
        this.submitBtn.setDisabled();
        this.submitBtn.htmlElement.classList.add('btn-submit--loading');
    }

    setNotReadonly() {
        Object.values(this.inputItems).forEach((input) => {
            input.input.setNotReadonly();
        });
        this.submitBtn.setEnabled();
        this.submitBtn.htmlElement.classList.remove('btn-submit--loading');
    }

    setInvalid() {
        Object.values(this.inputItems).forEach((input) => {
            input.input.setInvalid();
        });
    }

    setValid() {
        Object.values(this.inputItems).forEach((input) => {
            input.input.setValid();
        });
    }

    /**
     * Get input field by its name
     * @param {string} name - name of input field
     * @returns {HTMLElement} input html element
     */
    getFieldByName(name: string): HTMLInputElement {
        return this.inputItems[name].htmlInput;
    }

    /**
     * Get error field by it's input name
     * @param {string} name - name of input field
     * @returns {HTMLElement} error field html element
     */
    getErrorFieldByInputName(name: string): Element {
        return this.inputItems[name].htmlErrorBlock;
    }
}
