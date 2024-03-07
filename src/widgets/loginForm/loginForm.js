import { Form } from '../../entities/form/form';
import { domFromHtml } from '../../shared/lib/domFromHtml/domFromHtml';

export class LoginForm {
    /**
     * Constructor for LoginForm
     * @param {any} parent - parent object
     */
    constructor(parent) {
        this.parentItem = parent;
        this.form = new Form('login-form', 'Войти');
    }

    /**
     * Renders Login form
     * @returns {HTMLElement} rendered login form
     */
    render() {
        this.form.addField('login', 'Логин', 'text');
        this.form.addField('password', 'Пароль', 'password');
        const component = this.form.getElement();
        return domFromHtml(component);
    }
}
