import { Form } from '../../entities/form/form';
import './style.css';
import signupFormTmpl from './signupForm.pug';

export class SignUpForm {
    /**
     * Constructor for SignUp form
     * @param {HTMLElement} parent - parent html element
     */
    constructor(parent) {
        this.parent = parent;
        this.htmlElement = null;
        this.form = null;
    }

    /**
     * Renders signup form
     */
    render() {
        this.parent.insertAdjacentHTML('beforeend', signupFormTmpl());
        this.htmlElement =
            this.parent.getElementsByClassName('signup-form-card')[0];

        this.form = new Form(
            this.htmlElement.getElementsByClassName(
                'signup-form-card__main',
            )[0],
            'signup-form',
            'Зарегистрироваться',
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
