import { Form } from '@/entities/form';
import { LOGIN_FORM_FIELDS } from './config';

export class LoginForm extends Form {
    constructor(parent: Element) {
        super(parent, 'signup-form', 'Войти');
        Object.values(LOGIN_FORM_FIELDS).forEach((data) => {
            this.addInputBlock(data);
        });
    }
}
