import { Form } from '../../entities/form/form';
import { domFromHtml } from '../../shared/lib/domFromHtml/domFromHtml';
import './style.css';
import loginFormTmpl from './loginForm.pug';

export class LoginForm {
    /**
     * Constructor for Login form
     * @param {HTMLElement} parent - parent html element
     */
    constructor(parent) {
        this.parent = parent;
        this.form = null;
    }

    /**
     * Renders Login form
     */
    render() {
        this.parent.insertAdjacentHTML('beforeend', loginFormTmpl());
        this.htmlElement =
            this.parent.getElementsByClassName('login-form-card')[0];

        this.form = new Form(
            this.htmlElement.getElementsByClassName('login-form-card__main')[0],
            'login-form',
            'Войти',
        );

        this.form.addField('login', 'Логин', 'text', 'input-block__login');
        this.form.addField(
            'password',
            'Пароль',
            'password',
            'input-block__password',
        );

        this.form.render();
    }
}
