import pageTmpl from './index.template.pug';
import './index.style.scss';
import { Component } from '@/shared/@types/index.component';
import { ProfilePageProps } from './index.types';
import { ProfileBanner } from '@/widgets/profileBanner';

export class Profile extends Component<HTMLDivElement, ProfilePageProps> {
    constructor(parent: Element) {
        super(parent, pageTmpl, { className: 'profile-page' });
    }

    protected render() {
        this.renderTemplate();
        new ProfileBanner(
            this.htmlElement.getElementsByClassName('profile-banner')[0],
            { className: 'banner' },
        );
    }
}
