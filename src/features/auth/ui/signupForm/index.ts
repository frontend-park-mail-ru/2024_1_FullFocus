import { Form } from '@/entities/form';
import { SIGNUP_FORM_FIELDS } from './config';

export class SignUpForm extends Form {
    constructor(parent: Element) {
        super(parent, 'signup-form', 'Зарегистрироваться');
        Object.values(SIGNUP_FORM_FIELDS).forEach((data) => {
            this.addInputBlock(data);
        });
    }
}
