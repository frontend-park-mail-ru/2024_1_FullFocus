import './index.style.scss';
import dialogTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { AddCommentForm } from '@/features/comment';
import { Button, getExitBtn } from '@/shared/uikit/button';
import { parseForm } from '@/entities/form';
import { addComment } from '@/entities/comment/api';
import { addCommentDialogProps } from '@/widgets/comment/ui/addCommentDialog/index.types';

export class AddCommentDialog extends Component<
    HTMLDialogElement,
    addCommentDialogProps
> {
    protected errorElement: HTMLDivElement;
    protected formObj: AddCommentForm;
    protected closeBtn: Button;
    protected closeListener: (e: Event) => void;
    protected submitListener: (e: SubmitEvent) => void;

    constructor(parent: Element, props: addCommentDialogProps) {
        super(parent, dialogTmpl, props);
    }

    protected componentDidMount() {
        this.htmlElement.addEventListener('click', (e) => {
            const dialogDimensions = this.htmlElement.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                this.htmlElement.close();
            }
        });
        this.closeListener = (e: Event) => {
            e.preventDefault();
            this.htmlElement.close();
        };
        this.closeBtn.htmlElement.addEventListener('click', this.closeListener);

        this.submitListener = (e: SubmitEvent) => {
            e.preventDefault();
            const formData = parseForm(this.formObj);
            if (formData.isValid) {
                this.formObj.setReadonly();
                addComment({
                    productID: Number(this.props.params['productID']),
                    rating: Number(formData.inputs['rating']),
                    comment: formData.inputs['comment'].value,
                    advantages: formData.inputs['advantages'].value,
                    disadvantages: formData.inputs['disadvantages'].value
                })
                    .then((response) => {
                        this.formObj.setNotReadonly();
                        if (response.status === 200) {
                            this.htmlElement.close();
                            if (this.props.addCommentCallback) {
                                this.props.addCommentCallback();
                            }
                        }

                        if (response.status !== 200) {
                            this.formObj.setInvalid();
                            this.errorElement.innerText = response.msgRus;
                        }
                    })
                    .catch(() => {});
            }
        };
        this.htmlElement.addEventListener('submit', this.submitListener);
    }

    protected render() {
        this.renderTemplate();

        this.formObj = new AddCommentForm(
            this.htmlElement.getElementsByClassName(
                'edit-dialog__form-place',
            )[0],
            {
                productID: this.props.params['productID'],
                rating: this.props.rating,
                advantages: this.props.advantages,
                disadvantages: this.props.disadvantages,
                comment: this.props.comment,
            },
        );

        this.errorElement = this.htmlElement.getElementsByClassName(
            'edit-dialog__error',
        )[0] as HTMLDivElement;

        this.closeBtn = getExitBtn(
            this.htmlElement.getElementsByClassName(
                'edit-dialog__btn-close',
            )[0],
            {
                className: 'edit-dialog__btn-close',
                btnStyle: 'white',
                btnText: 'X',
                type: 'button',
            },
        );

        this.componentDidMount();
    }
}
