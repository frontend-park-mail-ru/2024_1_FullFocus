import './profile-back.png';
import './default-profile-pic.png';
import './index.style.scss';
import profilePannerTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileBannerProps } from './index.types';
import { ProfileCard } from './profileCard';
import { getUserData } from '@/entities/user/api';

export class ProfileBanner extends Component<
    HTMLDivElement,
    ProfileBannerProps
> {
    constructor(parent: Element, props: ProfileBannerProps) {
        super(parent, profilePannerTmpl, props);
    }

    protected render() {
        this.renderTemplate();

        getUserData()
            .then((response) => {
                const { data } = response;
                new ProfileCard(
                    this.htmlElement.getElementsByClassName(
                        'profile-banner__main',
                    )[0],
                    {
                        className: 'main__user-card',
                        pictureSrc:
                            data.imgSrc === ''
                                ? '/public/default-profile-pic.png'
                                : data.imgSrc,
                        realName: data.fullName,
                    },
                );
            })
            .catch(() => {});
    }
}
