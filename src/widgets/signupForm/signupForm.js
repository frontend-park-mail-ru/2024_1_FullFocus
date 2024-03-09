import { Form } from "../../entities/form/form";
import { domFromHtml } from "../../shared/lib/domFromHtml/domFromHtml";

export class SignUpForm {
    /**
     * Constructor for SignUp
     * @param {any} parent - parent object
     */
    constructor(parent) {
        this.parentItem = parent;
        this.form = new Form('signup-form', 'Зарегистрироваться');
    }

    /**
     * Renders signup form
     * @returns {HTMLElement} rendered html element
     */
    render() {
        this.form.addField('login', 'Логин', 'text');
        this.form.addField('password', 'Пароль', 'password');
        const component = this.form.getElement();
        return domFromHtml(component);
    }
}
