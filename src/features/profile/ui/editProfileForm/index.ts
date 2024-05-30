import { Form } from '@/entities/form';
import { EDIT_PROFILE_FORM_FIELDS } from './index.config';

interface EditProfileFormProps {
    [name: string]: string;
    phoneNumber: string;
    fullName: string;
    email: string;
}

export class EditProfileForm extends Form {
    constructor(parent: Element, props: EditProfileFormProps) {
        super(parent, 'edit-profile-form', 'Сохранить', 'xs', 'white');
        Object.entries(EDIT_PROFILE_FORM_FIELDS).forEach(([name, data]) => {
            this.addInputBlock({
                name: data.name,
                text: data.text,
                type: data.type,
                className: data.className,
                inputClassName: data.inputClassName,
                validate: data.validate,
                initialValue: props[name],
                header: true,
                size: 'xs',
            });
        });
    }
}
