import './index.style.scss';
import profileNotificationsTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileNotificationsProps } from './index.types';
import { getWS, useGetNotificationsList } from '@/features/notification';
import { NotificationsList } from '@/features/notification/ui/notificationsList';
import { Button } from '@/shared/uikit/button';
import { animateLongRequest } from '@/shared/api/ajax/throttling';

export class ProfileNotifications extends Component<
    HTMLDivElement,
    ProfileNotificationsProps
> {
    protected notificationsList: NotificationsList;
    protected readAllBtn: Button;
    protected unreadIds: string[];

    constructor(parent: Element, props: ProfileNotificationsProps) {
        super(parent, profileNotificationsTmpl, props);
    }

    protected componentDidMount() {
        if (this.readAllBtn) {
            this.readAllBtn.htmlElement.addEventListener('click', () => {
                this.notificationsList.readAll();
                this.destroyReadAllBtn();
            });
            this.htmlElement.addEventListener('notificationread', () => {
                if (!this.notificationsList.areUnread) {
                    this.destroyReadAllBtn();
                }
                this.htmlElement.dispatchEvent(
                    new Event('updatenavbar', {
                        bubbles: true,
                    }),
                );
            });
        }

        getWS().addCallback('updatenotifications', () => {
            this.updateNotifications(() => {
                this.htmlElement.dispatchEvent(
                    new Event('updatenavbar', { bubbles: true }),
                );
            });
        });
    }

    protected destroyReadAllBtn() {
        this.readAllBtn.destroy();
        this.readAllBtn = null;
    }

    protected render() {
        this.renderTemplate();
        this.updateNotifications(() => {
            this.componentDidMount();
        });
    }

    protected updateNotifications(callback?: () => void) {
        if (!this.notificationsList) {
            this.notificationsList = new NotificationsList(this.htmlElement, {
                className: 'profile-notifications__notifications',
                wrap: false,
                emptyText: '',
            });
        }
        animateLongRequest(
            useGetNotificationsList,
            (list) => {
                if (this.notificationsList) {
                    this.notificationsList.destroy();
                }

                this.notificationsList = list(
                    this.htmlElement,
                    'profile-notifications__notifications',
                );

                if (this.notificationsList.areUnread && !this.readAllBtn) {
                    this.readAllBtn = new Button(
                        this.htmlElement.getElementsByClassName(
                            'profile-notifications__subheader',
                        )[0],
                        {
                            className: 'profile-notifications__read-all-btn',
                            btnStyle: 'white',
                            size: 'no-padding',
                            type: 'button',
                            btnText: 'прочитать все',
                        },
                    );
                }

                if (callback) callback();
            },
            () => {},
            () => {
                this.notificationsList.setLoading('300px');
            },
            () => {
                this.notificationsList.removeLoading();
            },
            150,
            1000,
        )();
    }
}
