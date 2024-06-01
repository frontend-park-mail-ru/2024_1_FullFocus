import { FormField } from '@/entities/form';

export const ADD_COMMENT_FORM_FIELDS: { [name: string]: FormField } = {
    // rating: {
    //     name: 'rating',
    //     text: 'оценка от 1 до 5',
    //     type: 'text',
    //     className: 'input-block-rating',
    //     inputClassName: 'input-block-rating__input',
    // },
    advantages: {
        name: 'advantages',
        text: 'Достоинства',
        type: 'text',
        className: 'input-block-advantages',
        inputClassName: 'input-block-advantages__input',
    },
    disadvantages: {
        name: 'disadvantages',
        text: 'Недостатки',
        type: 'text',
        className: 'input-block-disadvantages',
        inputClassName: 'input-block-disadvantages__input',
    },
    comment: {
        name: 'comment',
        text: 'Комментарий',
        type: 'text',
        className: 'input-block-comment',
        inputClassName: 'input-block-comment__input',
    },
};
