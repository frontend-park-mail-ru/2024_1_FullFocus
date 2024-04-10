import pageTmpl from './index.template.pug';
import './index.style.scss';
import { Component } from '@/shared/@types/index.component';
import { ProfilePageProps } from './index.types';
import { ProfileBanner } from '@/widgets/profileBanner';
import { ProfileInfo } from '@/widgets/profileInfo';

export class Profile extends Component<HTMLDivElement, ProfilePageProps> {
    protected profileBanner: ProfileBanner;
    protected profileInfo: ProfileInfo;

    constructor(
        parent: Element,
        profilePage?: string,
        params?: { [name: string]: string },
    ) {
        super(parent, pageTmpl, {
            className: 'profile-page',
            profilePageName: profilePage,
            params: params,
        });
    }

    protected render() {
        this.renderTemplate();

        this.profileBanner = new ProfileBanner(
            this.htmlElement.getElementsByClassName('profile-banner')[0],
            { className: 'banner' },
        );

        this.profileInfo = new ProfileInfo(
            this.htmlElement.getElementsByClassName('profile-main')[0],
            {
                className: 'container profile-main__info',
            },
        );

        if (this.props.profilePageName) {
            this.profileInfo.renderProfileInfoPage(
                this.props.profilePageName,
                this.props.params ? Number(this.props.params['id']) : 0,
                () => {
                    this.profileBanner.update();
                },
            );
        }
    }
}