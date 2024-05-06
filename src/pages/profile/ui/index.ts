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
        navigateToMain: () => void,
        profilePage?: string,
        params?: { [name: string]: string },
    ) {
        super(parent, pageTmpl, {
            className: 'profile-page',
            profilePageName: profilePage,
            params: params,
            navigateToMain: navigateToMain,
        });
    }

    changePage(profilePageName: string, params?: { [name: string]: string }) {
        this.profileInfo.renderProfileInfoPage(
            profilePageName,
            params ? Number(params['id']) : 0,
            () => {
                this.profileBanner.update();
            },
        );
    }

    protected render() {
        this.renderTemplate();

        this.profileInfo = new ProfileInfo(
            this.htmlElement.getElementsByClassName('profile-main')[0],
            {
                className: 'container profile-main__info',
                navigateToMain: this.props.navigateToMain,
            },
        );

        if (this.props.profilePageName) {
            this.changePage(this.props.profilePageName, this.props.params);
        }
    }
}
