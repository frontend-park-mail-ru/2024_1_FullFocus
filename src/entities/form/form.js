import formTmpl from './form.pug';
import { domFromHtml } from '../../shared/lib/domFromHtml/domFromHtml';
import { Input } from '../../shared/uikit/input/input';
import { Button } from '../../shared/uikit/button/button';

export const INPUTS = {
    PASSWORD: 'password',
    EMAIL: 'email',
    TEXT: 'text',
};

export class Form {
    /**
     * Form class constructor
     * @param {string} formClass - class associated with a form
     * @param {string} submitText - text for a submit button
     */
    constructor(formClass, submitText = 'Submit') {
        this.submitText = submitText;
        this.formClass = formClass;
        this.fields = {};
    }

    /**
     * Add field to form
     * @param {string} name - name of the html input
     * @param {string} text - placeholder text for input
     * @param {string} type - html type of input
     */
    addField(name, text, type) {
        this.fields[name] = {
            name: name,
            placeholder: text,
            type: type,
            elClass: this.formClass.concat('__', name),
        };
    }

    /**
     * Get raw html of the form
     * @returns {string} generated html
     */
    getElement() {
        const form = domFromHtml(
            formTmpl({
                formClass: this.formClass,
                submitText: this.submitText,
            }),
        );
        Object.values(this.fields).forEach((attrs) => {
            const input = new Input(
                attrs.name,
                attrs.placeholder,
                attrs.type,
                attrs.elClass,
            ).render();
            form.appendChild(input);
        });

        form.appendChild(
            new Button('submit', 'btn-submit', this.submitText).render(),
        );

        return form;
    }

    /**
     * Get input field by its name
     * @param {string} name - name of input field
     * @returns {HTMLElement} input html element
     */
    getFieldByName(name) {
        return document.getElementsByClassName(this.fields[name].elClass)[0];
    }

    /**
     * Get error field by it's input name
     * @param {string} name - name of input field
     * @returns {HTMLElement} error field html element
     */
    getErrorFieldByInputName(name) {
        return document.getElementsByClassName(
            this.fields[name].elClass + '-error',
        )[0];
    }
}
