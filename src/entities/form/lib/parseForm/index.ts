import { FormData } from './index.types';
import { Form } from './../../ui';
import {
    validateDefault,
    validateEmail,
    validateLogin,
    validatePassword,
    validatePhoneNumber,
} from '@/shared/lib/validate';

export { FormData } from './index.types';

export function parseForm(form: Form): FormData {
    const formData: FormData = {
        isValid: true,
        inputs: {},
    };
    Object.entries(form.inputItems).forEach(([name, input]) => {
        formData.inputs[name] = {
            value: input.input.inputValue,
            error: null,
        };

        console.log(input.validate);

        if (input.validate) {
            switch (name) {
                case 'login':
                    formData.inputs[name].error = validateLogin(
                        formData.inputs[name].value,
                    );
                    break;
                case 'password':
                    formData.inputs[name].error = validatePassword(
                        formData.inputs[name].value,
                    );
                    break;
                case 'email':
                    formData.inputs[name].error = validateEmail(
                        formData.inputs[name].value,
                    );
                    break;
                case 'phoneNumber':
                    formData.inputs[name].error = validatePhoneNumber(
                        formData.inputs[name].value,
                    );
                    break;
                default:
                    formData.inputs[name].error = validateDefault(
                        formData.inputs[name].value,
                    );
                    break;
            }
        }

        if (formData.inputs[name].error != null) {
            formData.isValid = false;
            input.addError(formData.inputs[name].error);
            input.input.setInvalid();
        }

        if (formData.inputs[name].error == null) {
            input.clearErrors();
            input.input.setValid();
        }
    });

    return formData;
}
