import { Form } from '@/entities/form/form';
import './style.scss';
import signupFormTmpl from './signupForm.pug';

export class SignUpForm {
    parent: Element;
    htmlElement: HTMLDivElement;
    form: Form;

    /**
     * Constructor for SignUpForm
     */
    constructor(parent: Element) {
        this.parent = parent;
        this.htmlElement = null;
        this.form = null;
    }

    /**
     * Renders signup form
     */
    render() {
        this.parent.insertAdjacentHTML('beforeend', signupFormTmpl());
        this.htmlElement = this.parent.getElementsByClassName(
            'signup-form-card',
        )[0] as HTMLDivElement;

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
