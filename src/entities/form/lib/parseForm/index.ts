import { FormData } from './index.types';
import { Form } from './../../ui';
import {
    validateDefault,
    validateEmail,
    validateLogin,
    validatePassword,
    validatePhoneNumber,
    validateMaxInputLength,
    validateMark,
} from '@/shared/lib/validate';
import { validateRepeatPassword } from '@/shared/lib/validate/core';

export type { FormData } from './index.types';

// eslint-disable-next-line max-lines-per-function
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
                case 'repeatPassword':
                    if (formData.inputs['password'] !== undefined) {
                        const isPasswordError =
                            formData.inputs['password'].error !== null;
                        if (!isPasswordError) {
                            formData.inputs[name].error =
                                validateRepeatPassword(
                                    formData.inputs['password'].value,
                                    formData.inputs[name].value,
                                );
                            if (formData.inputs[name].error !== null) {
                                formData.inputs['password'].error = '';
                                form.inputItems['password'].setInValid();
                            }
                        }

                        if (isPasswordError) {
                            formData.inputs[name].error = '';
                            form.inputItems[name].setInValid();
                        }
                    }
                    break;
                case 'advantages':
                    formData.inputs[name].error = validateMaxInputLength(
                        formData.inputs[name].value,
                    );
                    break;
                case 'disadvantages':
                    formData.inputs[name].error = validateMaxInputLength(
                        formData.inputs[name].value,
                    );
                    break;
                case 'comment':
                    formData.inputs[name].error = validateMaxInputLength(
                        formData.inputs[name].value,
                    );
                    break;
                case 'rating':
                    formData.inputs[name].error = validateMark(
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

        if (formData.inputs[name].error !== null) {
            formData.isValid = false;
            input.addError(formData.inputs[name].error);
        }

        if (formData.inputs[name].error === null) {
            input.clearErrors();
            input.setValid();
        }
    });

    return formData;
}
