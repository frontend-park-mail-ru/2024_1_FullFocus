import { ProfileNotifications } from '../ui/notifications';
import { ProfileOneOrderInfo } from '../ui/oneOrderInfo';
import { ProfileOrdersInfo } from '../ui/ordersInfo/ui';
import { ProfileMainInfo } from '../ui/profileMainInfo/ui';
import { IProps, profileInfoConfig } from './index.types';
import { ProfilePromocodesInfo } from '@/widgets/profileInfo/ui/promocodeInfo/ui';

export const PROFILE_PAGES: profileInfoConfig = {
    info: {
        href: '/profile/info',
        text: 'Учетные данные',
        getComponent: (parent: Element, props: IProps) => {
            return new ProfileMainInfo(parent, {
                className: props.className,
                profileChangedCallback: props.profileChangedCallback,
            });
        },
    },
    orders: {
        href: '/profile/orders',
        text: 'Мои заказы',
        getComponent: (parent: Element, props: IProps) => {
            return new ProfileOrdersInfo(parent, {
                className: props.className,
            });
        },
    },
    oneOrder: {
        href: '/profile/order',
        getComponent: (parent: Element, props: IProps) => {
            return new ProfileOneOrderInfo(parent, {
                className: props.className,
                orderId: props.orderId,
            });
        },
    },
    promocodes: {
        href: '/profile/promocodes',
        text: 'Промокоды',
        getComponent: (parent: Element, props: IProps) => {
            return new ProfilePromocodesInfo(parent, {
                className: props.className,
            });
        },
        metaDataName: 'promocodesAvailable',
    },
    notifications: {
        href: '/profile/notifications',
        text: 'Уведомления',
        getComponent: (parent: Element, props: IProps) => {
            return new ProfileNotifications(parent, {
                className: props.className,
            });
        },
        metaDataName: 'unreadNotifications',
    },
};
