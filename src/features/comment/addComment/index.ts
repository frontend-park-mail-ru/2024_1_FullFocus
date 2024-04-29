import { Form } from '@/entities/form';
import { ADD_COMMENT_FORM_FIELDS } from './index.config';

export interface AddCommentFormProps {
    [name: string]: string;
    productID: string;
    rating: string;
    advantages: string,
    disadvantages: string,
    comment: string,
}

export class AddCommentForm extends Form {
    constructor(parent: Element, props: AddCommentFormProps) {
        super(parent, 'add-comment-form', 'Отправить отзыв');
        Object.entries(ADD_COMMENT_FORM_FIELDS).forEach(([name, data]) => {
            this.addInputBlock({
                name: data.name,
                text: data.text,
                type: data.type,
                className: data.className,
                inputClassName: data.inputClassName,
                validate: data.validate,
                initialValue: props[name],
            });
        });
    }
}