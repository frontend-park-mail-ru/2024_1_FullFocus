import formTmpl from './form.pug';
import { Input } from '@/shared/uikit/input/input';
import { Button } from '@/shared/uikit/button/button';
import { EmptyContainer } from '@/shared/uikit/emptyContainer/emptyContainer';

type InputType = 'password' | 'email' | 'text';

type Fields = {
    [key: string]: {
        name: string;
        placeholder: string;
        type: InputType;
        elClass: string;
    };
};

export class Form {
    parent: Element;
    submitText: string;
    formClass: string;
    fields: Fields;
    htmlElement: Element;

    /**
     * Form class constructor
     * @param {Element} parent - parent html element
     * @param {string} formClass - class associated with a form
     * @param {string} submitText - text for a submit button
     */
    constructor(
        parent: Element,
        formClass: string,
        submitText: string = 'Submit',
    ) {
        this.parent = parent;
        this.submitText = submitText;
        this.formClass = formClass;
        this.fields = {};
        this.htmlElement = null;
    }

    /**
     * Add field to form
     * @param {string} name - name of the html input
     * @param {string} text - placeholder text for input
     * @param {InputType} type - html type of input
     * @param {string} elClass - html element class
     */
    addField(name: string, text: string, type: InputType, elClass: string) {
        this.fields[name] = {
            name: name,
            placeholder: text,
            type: type,
            elClass: elClass,
        };
    }

    /**
     * Get raw html of the form
     */
    render() {
        this.parent.insertAdjacentHTML(
            'beforeend',
            formTmpl({
                formClass: this.formClass,
                submitText: this.submitText,
            }),
        );

        this.htmlElement = this.parent.getElementsByClassName(
            this.formClass,
        )[0];

        Object.values(this.fields).forEach((attrs) => {
            const inputItem = new Input(
                this.htmlElement,
                attrs.name,
                attrs.placeholder,
                attrs.type,
                attrs.elClass,
            );
            inputItem.render();

            const input = this.htmlElement.getElementsByClassName(
                'input-block-' + attrs.name,
            )[0];
            if (attrs.type === 'password') {
                const btnItem = new Button(
                    input,
                    'button',
                    'hide-show-password-btn',
                    'show',
                );

                btnItem.render();
                const btn = btnItem.htmlElement;

                btn.addEventListener('click', (e) => {
                    const inputField = input.getElementsByClassName(
                        attrs.elClass,
                    )[0] as HTMLInputElement;
                    const target = e.target as HTMLButtonElement;
                    if (inputField.type === 'password') {
                        inputField.type = 'text';
                        target.textContent = 'hide';
                    } else {
                        inputField.type = 'password';
                        target.textContent = 'show';
                    }
                });
            }

            const errorCont = new EmptyContainer(
                input,
                'input-block__error'.concat(' ', attrs.elClass + '-error'),
            );
            errorCont.render();
            const errorField = errorCont.htmlElement;
            errorField.hidden = true;
            input.appendChild(errorField);
        });

        new Button(
            this.htmlElement,
            'submit',
            'btn-submit',
            this.submitText,
        ).render();
    }

    /**
     * Get input field by its name
     * @param {string} name - name of input field
     * @returns {HTMLElement} input html element
     */
    getFieldByName(name: string): HTMLInputElement {
        return this.htmlElement.getElementsByClassName(
            'input-block__' + this.fields[name].elClass,
        )[0] as HTMLInputElement;
    }

    /**
     * Get error field by it's input name
     * @param {string} name - name of input field
     * @returns {HTMLElement} error field html element
     */
    getErrorFieldByInputName(name: string): Element {
        return document.getElementsByClassName(
            this.fields[name].elClass + '-error',
        )[0];
    }
}
