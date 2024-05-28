import { FormInputProps, FormInput } from './formInput';
import { InputType } from '@/shared/uikit/input';

export interface FormProps {
    className: string;
    submitText: string;
    size?: 'xs' | 'sm' | 'bg';
    style?: 'whiteWithBg' | 'bright' | 'green' | 'white' | 'red';
}

export type Inputs = {
    [name: string]: FormInputProps;
};

export type InputItems = {
    [name: string]: FormInput;
};

export interface IFormField {
    name: string;
    text: string;
    type: InputType;
    className: string;
    inputClassName: string;
    validate?: boolean;
    header?: boolean;
    initialValue?: string;
    size?: 'xs' | 'sm' | 'bg';
}
