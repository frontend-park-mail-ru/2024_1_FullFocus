import { Form } from "../../entities/form/form";
import { domFromHtml } from "../../shared/lib/domFromHtml/domFromHtml";

export class SignUpForm {
    constructor(parent) {
        this.parentItem = parent;
        this.form = new Form('signup-form', 'Зарегистрироваться');
    }

    render() {
        this.form.addField('login', 'Логин', 'login');
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

    validate() {
        return this.form.validate();
    }
}

