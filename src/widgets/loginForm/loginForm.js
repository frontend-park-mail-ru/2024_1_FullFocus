import { Form } from '../../entities/form/form';
import { domFromHtml } from '../../shared/lib/domFromHtml/domFromHtml';
import './style.css';
import loginFormTmpl from './loginForm.pug';

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
        const component = domFromHtml(loginFormTmpl());
        const formComponent = this.form.getElement();
        component.getElementsByClassName('login-form-card__main')[0].insertAdjacentHTML('beforeend', formComponent);
        return component;
    }
}
