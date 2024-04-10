import './index.style.scss';
import dialogTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { EditProfileDialogProps } from './index.types';
import { EditProfileForm } from '@/features/profile';
import { Button } from '@/shared/uikit/button';
import { parseForm } from '@/entities/form';
import { updateProfile } from '@/entities/user/api';

export class EditProfileDialog extends Component<
    HTMLDialogElement,
    EditProfileDialogProps
> {
    protected formObj: EditProfileForm;
    protected closeBtn: Button;
    protected closeListener: (e: Event) => void;
    protected submitListener: (e: SubmitEvent) => void;

    constructor(parent: Element, props: EditProfileDialogProps) {
        super(parent, dialogTmpl, props);
    }

    protected componentDidMount() {
        this.closeListener = (e: Event) => {
            e.preventDefault();
            this.htmlElement.close();
        };
        this.closeBtn.htmlElement.addEventListener('click', this.closeListener);

        this.submitListener = (e: SubmitEvent) => {
            e.preventDefault();
            const formData = parseForm(this.formObj);
            console.log(formData);
            if (formData.isValid) {
                updateProfile({
                    fullName: formData.inputs['fullName'].value,
                    phoneNumber: formData.inputs['phoneNumber'].value,
                    email: formData.inputs['email'].value,
                })
                    .then(({ status }) => {
                        if (status === 200) {
                            this.htmlElement.close();
                            if (this.props.profileChangedCallback) {
                                this.props.profileChangedCallback();
                            }
                        }
                    })
                    .catch(() => {});
            }
        };
        this.htmlElement.addEventListener('submit', this.submitListener);
    }

    protected render() {
        this.renderTemplate();

        this.formObj = new EditProfileForm(this.htmlElement);
        this.closeBtn = new Button(
            this.htmlElement.getElementsByClassName(
                'edit-dialog__btn-close',
            )[0],
            {
                className: 'edit-dialog__btn-close',
                btnStyle: 'withOutline',
                btnText: 'X',
                type: 'button',
            },
        );

        this.componentDidMount();
    }
}
