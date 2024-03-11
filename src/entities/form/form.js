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
     * Get input field by its name
     * @param {string} name - name of input field
     * @returns {HTMLElement} input html element
     */
    getFieldByName(name) {
        return document.getElementsByClassName(this.fields[name].class)[0];
    }
    
    /**
     * Get error field by it's input name
     * @param {string} name - name of input field
     * @returns {HTMLElement} error field html element
     */
    getErrorFieldByInputName(name) {
        return document.getElementsByClassName(this.fields[name].class + '-error')[0];
    }
}
