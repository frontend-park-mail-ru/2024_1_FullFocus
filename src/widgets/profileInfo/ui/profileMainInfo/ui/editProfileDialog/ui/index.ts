import './index.style.scss';
import dialogTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { EditProfileDialogProps } from './index.types';
import { EditProfileForm } from '@/features/profile';
import { Button, getExitBtn } from '@/shared/uikit/button';
import { parseForm } from '@/entities/form';
import { updateProfile } from '@/entities/user/api';

export class EditProfileDialog extends Component<
    HTMLDialogElement,
    EditProfileDialogProps
> {
    protected errorElement: HTMLDivElement;
    protected formObj: EditProfileForm;
    protected closeBtn: Button;
    protected closeListener: (e: Event) => void;
    protected submitListener: (e: SubmitEvent) => void;

    constructor(parent: Element, props: EditProfileDialogProps) {
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
                updateProfile({
                    fullName: formData.inputs['fullName'].value,
                    phoneNumber: formData.inputs['phoneNumber'].value,
                    email: formData.inputs['email'].value,
                })
                    .then((response) => {
                        this.formObj.setNotReadonly();
                        if (response.status === 200) {
                            this.htmlElement.close();
                            if (this.props.profileChangedCallback) {
                                this.props.profileChangedCallback();
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

        this.formObj = new EditProfileForm(
            this.htmlElement.getElementsByClassName(
                'edit-dialog__form-place',
            )[0],
            {
                email: this.props.email,
                phoneNumber: this.props.phoneNumber,
                fullName: this.props.fullName,
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
