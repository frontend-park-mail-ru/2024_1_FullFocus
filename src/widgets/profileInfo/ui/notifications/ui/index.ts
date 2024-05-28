import './index.style.scss';
import profileNotificationsTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileNotificationsProps } from './index.types';
import { getWS, useGetNotificationsList } from '@/features/notification';
import { NotificationsList } from '@/features/notification/ui/notificationsList';
import { Button } from '@/shared/uikit/button';

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
            this.updateNotifications()
                .then(() => {
                    this.htmlElement.dispatchEvent(
                        new Event('updatenavbar', { bubbles: true }),
                    );
                })
                .catch(() => {});
        });
    }

    protected destroyReadAllBtn() {
        this.readAllBtn.destroy();
        this.readAllBtn = null;
    }

    protected render() {
        this.renderTemplate();
        this.updateNotifications()
            .then(() => {
                this.componentDidMount();
            })
            .catch(() => {});
    }

    protected async updateNotifications() {
        return useGetNotificationsList()
            .then((list) => {
                if (this.notificationsList) {
                    this.notificationsList.destroy();
                }

                this.notificationsList = list(
                    this.htmlElement,
                    'profile-notifications__notifications',
                );

                if (this.notificationsList.areUnread) {
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
            })
            .catch(() => {});
    }
}
