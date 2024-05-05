import './index.style.scss';
import profileInfoTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileInfoProps } from './index.types';
import { ProfileNavbar } from './profileNavbar';
import { PROFILE_PAGES } from '../config';
import { IProps } from '../config/index.types';

export class ProfileInfo extends Component<HTMLDivElement, ProfileInfoProps> {
    protected activePage: string;
    protected navbar: ProfileNavbar;
    protected pageElement: HTMLDivElement;
    protected currentPage: Component<Element>;
    protected pages: {
        [name: string]: (parent: Element, props: IProps) => Component<Element>;
    };

    constructor(parent: Element, props: ProfileInfoProps) {
        super(parent, profileInfoTmpl, props);
    }

    renderProfileInfoPage(
        pageName: string,
        orderId?: number,
        changedProfileCallback?: () => void,
    ) {
        if (pageName in this.pages) {
            this.navbar.changeActiveItem(pageName);
            this.pageElement.innerHTML = '';
            this.currentPage = this.pages[pageName](this.pageElement, {
                className: 'profile-page-' + pageName,
                orderId: orderId,
                profileChangedCallback: changedProfileCallback,
            });
        }
    }

    protected render() {
        this.renderTemplate();

        this.pages = {};

        this.pageElement = this.htmlElement.getElementsByClassName(
            'profile-info__page',
        )[0] as HTMLDivElement;

        this.navbar = new ProfileNavbar(
            this.htmlElement.getElementsByClassName('profile-info__navbar')[0],
            {
                className: 'profile-info__profile-navbar',
                navigateToMain: this.props.navigateToMain,
            },
        );

        Object.entries(PROFILE_PAGES).forEach(
            ([name, { href, text, getComponent }]) => {
                if (text) {
                    this.navbar.addLink(name, {
                        className: 'profile-page-link-' + name,
                        href: href,
                        text: text,
                        style: 'with-bg',
                    });
                }

                this.pages[name] = getComponent;
            },
        );

        this.navbar.updateNavbar();
    }
}
