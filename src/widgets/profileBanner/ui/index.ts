import './profile-back.png';
import './default-profile-pic.png';
import './index.style.scss';
import profilePannerTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileBannerProps } from './index.types';
import { ProfileCard } from './profileCard';
import { useGetProfileInfo } from '@/features/profile/api';

export class ProfileBanner extends Component<
    HTMLDivElement,
    ProfileBannerProps
> {
    constructor(parent: Element, props: ProfileBannerProps) {
        super(parent, profilePannerTmpl, {
            className: props.className,
        });
    }

    protected render() {
        this.renderTemplate();

        useGetProfileInfo()
            .then((data) => {
                new ProfileCard(
                    this.htmlElement.getElementsByClassName(
                        'profile-banner__main',
                    )[0],
                    {
                        className: 'main__user-card',
                        pictureSrc: data.pictureSrc,
                        realName: data.name + ' ' + data.surname,
                        login: data.login,
                    },
                );
            })
            .catch(() => {});
    }
}
