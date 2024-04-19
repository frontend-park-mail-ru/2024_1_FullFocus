import './index.style.scss';
import './default-profile-pic.png';
import profileMainInfoTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileMainInfoProps } from './index.types';
import { EditProfileDialog } from './editProfileDialog';
import { ChangePicture } from './changePicture';
import { useGetProfileInfo } from '@/features/profile/api';
import { Button, getEditBtn } from '@/shared/uikit/button';

export class ProfileMainInfo extends Component<
    HTMLDivElement,
    ProfileMainInfoProps
> {
    protected fullName: HTMLDivElement;
    protected editBtn: Button;
    protected phoneNumber: HTMLDivElement;
    protected email: HTMLDivElement;
    protected listener: (e: Event) => void;
    protected dialog: EditProfileDialog;
    protected changePicture: ChangePicture;

    constructor(parent: Element, props: ProfileMainInfoProps) {
        super(parent, profileMainInfoTmpl, props);
    }

    protected componentDidMount() {
        this.listener = () => {
            this.dialog.htmlElement.showModal();
        };
        this.editBtn.htmlElement.addEventListener('click', this.listener);
    }

    protected render() {
        this.renderTemplate();

        this.editBtn = getEditBtn(
            this.htmlElement.getElementsByClassName(
                'profile-main-info__header',
            )[0],
            {
                className: 'profile-main-info__edit-icon',
                btnStyle: 'white',
                type: 'button',
            },
        );

        this.fullName = this.htmlElement.getElementsByClassName(
            'profile-main-info__full-name',
        )[0] as HTMLDivElement;

        this.phoneNumber = this.htmlElement.getElementsByClassName(
            'profile-main-info__phone-number',
        )[0] as HTMLDivElement;

        this.email = this.htmlElement.getElementsByClassName(
            'profile-main-info__email',
        )[0] as HTMLDivElement;

        this.changePicture = new ChangePicture(
            this.htmlElement.getElementsByClassName(
                'profile-main-info__change-picture-container',
            )[0],
            {
                className: 'profile-main-info__change-picture',
                defaultPictureSrc: '/public/default-profile-pic.png',
                changePictureCallback: () => {
                    this.update();
                    this.props.profileChangedCallback;
                },
            },
        );

        useGetProfileInfo()
            .then((response) => {
                this.dialog = new EditProfileDialog(this.htmlElement, {
                    className: 'profile-main-info__edit-dialog',
                    profileChangedCallback: () => {
                        this.update();
                        if (this.props.profileChangedCallback) {
                            this.props.profileChangedCallback();
                        }
                    },
                    fullName: response.fullName,
                    email: response.email,
                    phoneNumber: response.phoneNumber,
                });

                this.fullName.innerText = response.fullName;
                this.phoneNumber.innerText = response.phoneNumber;
                this.email.innerText = response.email;
                this.changePicture.pictureSrc =
                    response.pictureSrc === ''
                        ? '/public/default-profile-pic.png'
                        : response.pictureSrc;
            })
            .catch(() => {});

        this.componentDidMount();
    }
}
