import { Form } from '@/entities/form';
import { EDIT_PROFILE_FORM_FIELDS } from './index.config';

export class EditProfileForm extends Form {
    constructor(parent: Element) {
        super(parent, 'edit-profile-form', 'Изменить');
        Object.values(EDIT_PROFILE_FORM_FIELDS).forEach((data) => {
            this.addInputBlock(data);
        });
    }
}
