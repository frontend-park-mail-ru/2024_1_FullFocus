import { Form } from '../../entities/form/form';
import { domFromHtml } from '../../shared/lib/domFromHtml/domFromHtml';
import './style.css';
import signupFormTmpl from './signupForm.pug';

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
        const component = domFromHtml(signupFormTmpl());
        const formComponent = this.form.getElement();
        component
            .getElementsByClassName('signup-form-card__main')[0]
            .insertAdjacentHTML('beforeend', formComponent);
        return component;
    }
}
