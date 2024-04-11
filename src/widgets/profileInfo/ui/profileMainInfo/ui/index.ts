import './index.style.scss';
import profileMainInfoTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileMainInfoProps } from './index.types';
import { getUserData } from '@/entities/user';
import { EditProfileDialog } from './editProfileDialog';
import { ChangePicture } from './changePicture';

export class ProfileMainInfo extends Component<
    HTMLDivElement,
    ProfileMainInfoProps
> {
    protected fullName: HTMLDivElement;
    protected editIcon: HTMLElement;
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
        this.editIcon.addEventListener('click', this.listener);
    }

    protected render() {
        this.renderTemplate();

        this.fullName = this.htmlElement.getElementsByClassName(
            'profile-main-info__full-name',
        )[0] as HTMLDivElement;

        this.editIcon = this.htmlElement.getElementsByClassName(
            'profile-main-info__edit-icon',
        )[0] as HTMLElement;

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

        getUserData()
            .then((response) => {
                const data = response.data;

                this.dialog = new EditProfileDialog(this.htmlElement, {
                    className: 'profile-main-info__edit-dialog',
                    profileChangedCallback: () => {
                        this.update();
                        if (this.props.profileChangedCallback) {
                            this.props.profileChangedCallback();
                        }
                    },
                    fullName: data.fullName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                });

                this.fullName.innerText = data.fullName;
                this.phoneNumber.innerText = data.phoneNumber;
                this.email.innerText = data.email;
                this.changePicture.pictureSrc =
                    data.imgSrc === ''
                        ? '/public/default-profile-pic.png'
                        : data.imgSrc;
            })
            .catch(() => {});

        this.componentDidMount();
    }
}
