import { validateEmail } from "../../shared/lib/validate/validateEmail";
import { validatePassword } from "../../shared/lib/validate/validatePassword";
import formTmpl from './form.pug'

export const INPUTS = {
    PASSWORD: 'password',
    EMAIL: 'email'
};

export class Form {
    /**
     * 
     * @param {string} formClass class associated with form
     */
    constructor(formClass, submitText='Submit') {
        this.submitText = submitText;
        this.formClass = formClass;
        this.fields = {};
    }

    addField(name, text, type) {
        this.fields[name] = {name: name, placeholder: text, type: type, class: this.formClass.concat('__', name)};
    }

    getElement() {
        return formTmpl({formClass: this.formClass, fields: this.fields, submitText: this.submitText});
    }

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
            }
        }
        if (wrongFields.length != 0) {
            return wrongFields;
        }
        return null;
    }

    getFieldByName(name) {
        return document.getElementsByClassName(this.fields[name].class)[0];
    }
}
