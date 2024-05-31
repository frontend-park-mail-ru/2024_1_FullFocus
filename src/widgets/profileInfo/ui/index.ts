import './index.style.scss';
import profileInfoTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileInfoProps } from './index.types';
import { ProfileNavbar } from './profileNavbar';
import { PROFILE_PAGES } from '../config';
import { IProps } from '../config/index.types';
import { getMainUserData } from '@/entities/user/api';

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

            this.updateNabarBadges();
        }
    }

    protected componentDidMount() {
        this.htmlElement.addEventListener('updatenavbar', () => {
            this.updateNabarBadges();
        });
    }

    protected updateNabarBadges() {
        getMainUserData()
            .then(({ status, data }) => {
                if (status === 200) {
                    const unreadNotifications = data.unreadNotifications;
                    this.navbar.updateBadge(
                        'notifications',
                        unreadNotifications.toString(),
                    );

                    if (unreadNotifications > 0) {
                        this.navbar.showBadge('notifications');
                    }

                    if (unreadNotifications <= 0) {
                        this.navbar.hideBadge('notifications');
                    }

                    const promocodes = data.promocodesAvailable;
                    this.navbar.updateBadge(
                        'promocodes',
                        promocodes.toString(),
                    );

                    if (promocodes > 0) {
                        this.navbar.showBadge('promocodes');
                    }

                    if (promocodes <= 0) {
                        this.navbar.hideBadge('promocodes');
                    }
                }
            })
            .catch(() => {});
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
            ([name, { href, text, getComponent, icon }]) => {
                if (text) {
                    this.navbar.addLink(name, {
                        className: 'profile-page-link-' + name,
                        href: href,
                        text: text,
                        style: 'with-bg',
                        direction: 'horizontal',
                        iconTmpl: icon,
                    });
                }

                this.pages[name] = getComponent;
            },
        );

        this.navbar.updateNavbar();

        this.componentDidMount();
    }
}
