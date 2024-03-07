import './style.css'
import { validateEmail } from "../../shared/lib/validate/validateEmail";
import { validatePassword } from "../../shared/lib/validate/validatePassword";
import { validateText } from "../../shared/lib/validate/validateText";
import formTmpl from './form.pug'

export const INPUTS = {
    PASSWORD: 'password',
    EMAIL: 'email',
    TEXT: 'text'
};

export class Form {
    /**
     * Form class constructor
     * @param {string} formClass - class associated with a form
     * @param {string} submitText - text for a submit button
     */
    constructor(formClass, submitText='Submit') {
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
        this.fields[name] = {name: name, placeholder: text, type: type, class: this.formClass.concat('__', name)};
    }

    /**
     * Get raw html of the form
     * @returns {string} generated html
     */
    getElement() {
        return formTmpl({formClass: this.formClass, fields: this.fields, submitText: this.submitText});
    }

    /**
     * Validate form
     * @returns {Array|null} array of input fields name with errors
     */
    validate() {
        const wrongFields = [];
        for (const [name, field] of Object.entries(this.fields)) { 
            const element = this.getFieldByName(name);
            switch (field.type) {
                case INPUTS.PASSWORD:
                    if (!validatePassword(element)) {
                        wrongFields.push(name);
                    }
                    break;
                case INPUTS.EMAIL:
                    if (!validateEmail(element)) {
                        wrongFields.push(name);
                    }
                    break;
                case INPUTS.TEXT:
                    if (!validateText(element)) {
                        wrongFields.push(name);
                    }
            }
        }
        if (wrongFields.length != 0) {
            return wrongFields;
        }
        return null;
    }

    /**
     * Get input field by its name
     * @param {string} name - name of input field
     * @returns {HTMLElement} input html element
     */
    getFieldByName(name) {
        return document.getElementsByClassName(this.fields[name].class)[0];
    }
}
