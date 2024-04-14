import { FormField } from '@/entities/form';

export const EDIT_PROFILE_FORM_FIELDS: { [name: string]: FormField } = {
    fullName: {
        name: 'fullName',
        text: 'Ф.И.О',
        type: 'text',
        className: 'input-block-fullname',
        inputClassName: 'input-block-fullname__input',
    },
    phoneNumber: {
        name: 'phoneNumber',
        text: 'Номер телефона',
        type: 'text',
        className: 'input-block-phone-number',
        inputClassName: 'input-block-phone-number__input',
    },
    email: {
        name: 'email',
        text: 'Email',
        type: 'text',
        className: 'input-block-email',
        inputClassName: 'input-block-email__input',
    },
};
