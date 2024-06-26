import { FormField } from '@/entities/form';

export const LOGIN_FORM_FIELDS: { [name: string]: FormField } = {
    login: {
        name: 'login',
        text: 'Логин',
        type: 'text',
        className: 'input-block-login',
        inputClassName: 'input-block-login__input',
    },
    password: {
        name: 'password',
        text: 'Пароль',
        type: 'password',
        className: 'input-block-password',
        inputClassName: 'input-block-password__input',
    },
};
