import './index.style.scss';
import './default-profile-pic.png';
import profileMainInfoTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileMainInfoProps } from './index.types';
import { EditProfileDialog } from './editProfileDialog';
import { ChangePicture } from './changePicture';
import { useGetProfileInfo } from '@/features/profile/api';
import { Button, getEditBtn } from '@/shared/uikit/button';
import { UserInfo } from './profileInfo';
import { formatPhoneNumberMask } from '@/entities/form/lib';
import { animateLongRequest } from '@/shared/api/ajax/throttling';

export class ProfileMainInfo extends Component<
    HTMLDivElement,
    ProfileMainInfoProps
> {
    protected editBtn: Button;
    protected fullNameData: string;
    protected phoneNumberData: string;
    protected emailData: string;
    protected listener: (e: Event) => void;
    protected mainInfoElement: HTMLDivElement;
    protected dialog: EditProfileDialog;
    protected profileUpdatedListener: (e: CustomEvent) => void;
    protected userInfo: UserInfo;
    protected changePicture: ChangePicture;

    constructor(parent: Element, props: ProfileMainInfoProps) {
        super(parent, profileMainInfoTmpl, props);
    }

    protected componentDidMount() {
        this.listener = () => {
            const isUserInfo = this.userInfo !== null;

            if (isUserInfo) {
                this.renderUpdateProfileInfo();
            }

            if (!isUserInfo) {
                this.renderProfileInfo();
            }
        };
        this.editBtn.htmlElement.addEventListener('click', this.listener);
    }

    startLoading() {
        this.htmlElement
            .getElementsByClassName('profile-main-info__main-info')[0]
            .classList.add('profile-main-info__main-info--loading');
    }

    stopLoading() {
        this.htmlElement
            .getElementsByClassName('profile-main-info__main-info')[0]
            .classList.remove('profile-main-info__main-info--loading');
    }

    protected render() {
        this.renderTemplate();

        this.dialog = null;
        this.userInfo = null;

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

        this.mainInfoElement = this.htmlElement.getElementsByClassName(
            'profile-main-info__user-data',
        )[0] as HTMLDivElement;

        animateLongRequest(
            useGetProfileInfo,
            (response) => {
                if (
                    response.email.length <= 0 ||
                    response.fullName.length <= 0 ||
                    response.phoneNumber.length <= 0
                )
                    return;
                this.fullNameData = response.fullName;
                this.phoneNumberData = response.phoneNumber;
                this.emailData = response.email;

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

                this.renderProfileInfo();

                this.changePicture.pictureSrc =
                    response.pictureSrc === ''
                        ? '/public/default-profile-pic.png'
                        : response.pictureSrc;

                this.componentDidMount();
            },
            () => {
                (
                    this.htmlElement.getElementsByClassName(
                        'profile-main-info__main-info',
                    )[0] as HTMLDivElement
                ).innerText = 'Что-то пошло не так';
            },
            () => {
                this.startLoading();
            },
            () => {
                this.stopLoading();
            },
            150,
            1000,
        )();
    }

    protected renderProfileInfo() {
        if (this.dialog !== null) {
            this.dialog.htmlElement.removeEventListener(
                'profileupdated',
                this.profileUpdatedListener,
            );
            this.dialog.destroy();
            this.dialog = null;
        }
        this.userInfo = new UserInfo(this.mainInfoElement, {
            className: 'profile-info__main-info',
            fullName: this.fullNameData,
            phoneNumber: formatPhoneNumberMask(this.phoneNumberData),
            email: this.emailData,
        });
    }

    protected renderUpdateProfileInfo() {
        this.userInfo?.destroy();
        this.userInfo = null;
        this.dialog = new EditProfileDialog(this.mainInfoElement, {
            className: 'profile-main-info__edit-dialog',
            profileChangedCallback: (
                fullName: string,
                email: string,
                phoneNumber: string,
            ) => {
                this.fullNameData = fullName;
                this.emailData = email;
                this.phoneNumberData = phoneNumber;
                this.renderProfileInfo();
                if (this.props.profileChangedCallback) {
                    this.props.profileChangedCallback();
                }
            },
            fullName: this.fullNameData,
            email: this.emailData,
            phoneNumber: this.phoneNumberData,
        });
        this.dialog.htmlElement.addEventListener(
            'profileupdated',
            this.profileUpdatedListener,
        );
    }
}
