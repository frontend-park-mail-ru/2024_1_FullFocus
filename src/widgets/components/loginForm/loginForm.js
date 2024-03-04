import { Form } from '../../../entities/form/form';
import { domFromHtml } from '../../../shared/lib/domFromHtml/domFromHtml';

export class LoginForm {
    constructor(parent) {
        this.parentItem = parent;
        this.form = new Form('login-form', 'Войти');
    }

    render() {
        this.form.addField('email', 'Почта', 'email');
        this.form.addField('password', 'Пароль', 'password');
        const component = this.form.getElement();
        return domFromHtml(component);
    }

    emailElement() {
        return this.form.getFieldByName('email');
    }

    passwordElement() {
        return this.form.getFieldByName('password');
    }
}
