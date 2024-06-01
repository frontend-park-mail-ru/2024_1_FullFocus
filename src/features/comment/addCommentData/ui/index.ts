import { Form } from '@/entities/form';
import { ADD_COMMENT_FORM_FIELDS } from '../config';

export interface useAddCommentFormProps {
    [name: string]: string;
    productID: string;
    productDescription: string;
    productSrc: string;
}

export class UseAddCommentData extends Form {
    constructor(parent: Element, props: useAddCommentFormProps) {
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
                size: 'sm',
            });
        });
    }
}
