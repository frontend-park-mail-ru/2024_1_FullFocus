import formTmpl from './template.pug';
import './style.scss';
import { Button } from '@/shared/uikit/button';
import { Component } from '@/shared/@types/component';
import { FormInput } from './formInput';
import { FormProps, Inputs, InputItems, IFormField } from './types';

export { IFormField } from './types';

export class Form extends Component<HTMLFormElement, FormProps> {
    submitText: string;
    inputProps: Inputs;
    inputItems: InputItems;
    submitBtn: Button;

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
        });
        this.inputProps = {};
        this.inputItems = {};
        this.submitText = submitText;
    }

    /**
     * Add field to form
     * @param {string} name - name of the html input
     * @param {string} text - placeholder text for input
     * @param {InputType} type - html type of input
     * @param {string} className - html element class
     */
    addInputBlock(params: IFormField) {
        this.inputProps[params.name] = {
            placeholder: params.text,
            type: params.type,
            className: 'input-block ' + params.className,
            inputClassName: params.inputClassName,
            name: params.name,
            status: 'notValidated',
            errorBlockClassName:
                'input-block__error ' + params.className + '-error',
        };
    }

    /**
     * Render Form element
     */
    render() {
        super.render();

        Object.entries(this.inputProps).forEach(([name, props]) => {
            const input = new FormInput(this.htmlElement, props);
            input.render();

            this.inputItems[name] = input;
        });

        this.submitBtn = new Button(this.htmlElement, {
            type: 'submit',
            className: 'btn-submit',
            btnText: this.submitText,
            btnStyle: 'bright',
        });
        this.submitBtn.render();
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