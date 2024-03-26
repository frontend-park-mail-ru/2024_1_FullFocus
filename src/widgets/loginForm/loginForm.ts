import { Form } from '@/entities/form/form';
import './style.scss';
import loginFormTmpl from './loginForm.pug';

export class LoginForm {
    parent: Element;
    form: Form;
    htmlElement: HTMLDivElement;
    /**
     * Constructor for Login form
     * @param {Element} parent - parent html element
     */
    constructor(parent: Element) {
        this.parent = parent;
        this.form = null;
        this.htmlElement = null;
    }

    /**
     * Renders Login form
     */
    render() {
        this.parent.insertAdjacentHTML('beforeend', loginFormTmpl());
        this.htmlElement = this.parent.getElementsByClassName(
            'login-form-card',
        )[0] as HTMLDivElement;

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
