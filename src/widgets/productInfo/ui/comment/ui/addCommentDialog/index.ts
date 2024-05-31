import './index.style.scss';
import dialogTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { UseAddCommentData } from '@/features/comment';
import { Button, getExitBtn } from '@/shared/uikit/button';
import { parseForm } from '@/entities/form';
import { addComment } from '@/features/comment/api';
import { addCommentDialogProps } from './index.types';
import { RatingInput } from '@/shared/uikit/starRatingInput';
import { isClickOut } from '@/shared/lib/clickOut';
import { insertDarkOverlay } from '@/shared/lib/darkOverlay';

export class AddCommentDialog extends Component<
    HTMLDialogElement,
    addCommentDialogProps
> {
    protected errorElement: HTMLDivElement;
    protected formObj: UseAddCommentData;
    protected closeBtn: Button;
    protected closeListener: (e: Event) => void;
    protected submitListener: (e: SubmitEvent) => void;
    protected starsRating: RatingInput;
    protected overlay: HTMLDivElement;
    protected opened: boolean;
    protected onResize: () => void;
    protected height: string;

    constructor(parent: Element, props: addCommentDialogProps) {
        super(parent, dialogTmpl, props);
        this.opened = false;
    }

    open() {
        this.overlay = insertDarkOverlay(this.parent);
        this.height =
            window.screen.width > 475
                ? '50%'
                : window.screen.height > 650
                  ? '584px'
                  : '100%';
        this.htmlElement.animate([{ height: this.height, opacity: 1 }], {
            duration: 300,
            easing: 'ease',
        }).onfinish = () => {
            this.htmlElement.style.height = this.height;
            this.htmlElement.style.opacity = '1';
            this.htmlElement.style.overflow = 'auto';
            this.opened = true;
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
            this.overlay.addEventListener('click', (e) => {
                if (isClickOut(this.htmlElement, e)) {
                    this.close();
                }
            });
            window.addEventListener('resize', this.onResize);
        };
    }

    close() {
        this.overlay.remove();
        this.htmlElement.style.overflow = '';
        this.htmlElement.animate([{ height: 0, opacity: 0 }], {
            duration: 300,
            easing: 'ease',
        }).onfinish = () => {
            document.getElementsByTagName('body')[0].style.overflow = '';
            this.htmlElement.style.height = '0';
            this.htmlElement.style.opacity = '0';
            this.opened = false;
            window.removeEventListener('resize', this.onResize);
        };
    }

    protected componentDidMount() {
        this.onResize = () => {
            const height =
                window.screen.width > 475
                    ? '50%'
                    : window.screen.height > 650
                      ? '584px'
                      : '100%';
            if (this.height !== height) {
                this.height = height;
                this.htmlElement.style.height = this.height;
            }
        };

        this.closeListener = (e: Event) => {
            e.preventDefault();
            this.close();
        };
        this.closeBtn.htmlElement.addEventListener('click', this.closeListener);

        this.submitListener = (e: SubmitEvent) => {
            e.preventDefault();
            const rating = this.starsRating.currentRating;
            if (rating === 0) {
                this.formObj.setInvalid();
                this.errorElement.innerText = 'Поставьте оценку!';
            }

            if (rating !== 0) {
                const formData = parseForm(this.formObj);
                if (formData.isValid) {
                    this.formObj.setReadonly();
                    addComment({
                        productID: Number(this.props.productID),
                        rating: rating,
                        comment: formData.inputs['comment'].value,
                        advantages: formData.inputs['advantages'].value,
                        disadvantages: formData.inputs['disadvantages'].value,
                    })
                        .then((response) => {
                            this.formObj.setNotReadonly();
                            if (response.status === 201) {
                                this.close();
                                this.props.addProductCallback();
                            }

                            if (response.status !== 201) {
                                this.formObj.setInvalid();
                                this.errorElement.innerText =
                                    response.msgRus ?? 'что-то пошло не так';
                            }
                        })
                        .catch(() => {});
                }
            }
        };
        this.htmlElement.addEventListener('submit', this.submitListener);
    }

    protected render() {
        this.renderTemplate();

        this.starsRating = new RatingInput(
            this.htmlElement.getElementsByClassName(
                'add-dialog__stars-place',
            )[0],
            {
                className: 'add-dialog__stars-rating',
                maxRating: 5,
                size: 50,
                fullColorHex: '#FCD53F',
                emptyColorHex: '#E2E6E9',
            },
        );

        this.formObj = new UseAddCommentData(
            this.htmlElement.getElementsByClassName(
                'add-dialog__form-place',
            )[0],
            {
                productID: this.props.productID,
                productDescription: this.props.productDescription,
                productSrc: this.props.productSrc,
            },
        );

        this.errorElement = this.htmlElement.getElementsByClassName(
            'add-dialog__error',
        )[0] as HTMLDivElement;

        this.closeBtn = getExitBtn(
            this.htmlElement.getElementsByClassName('add-dialog__btn-close')[0],
            {
                className: 'add-dialog__btn-close',
                btnStyle: 'white',
                btnText: 'X',
                type: 'button',
            },
        );

        this.componentDidMount();
    }
}
