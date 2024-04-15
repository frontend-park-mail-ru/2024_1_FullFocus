import './index.style.scss';
import profileOrdersInfoTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileOrdersInfoProps } from './index.types';
import { useGetAllOrdersCards } from '@/features/order';

export class ProfileOrdersInfo extends Component<
    HTMLDivElement,
    ProfileOrdersInfoProps
> {
    constructor(parent: Element, props: ProfileOrdersInfoProps) {
        super(parent, profileOrdersInfoTmpl, props);
    }

    protected render() {
        this.renderTemplate();

        useGetAllOrdersCards()
            .then((orders) => {
                const parent = this.htmlElement.getElementsByClassName(
                    'profile-orders-info__main-info',
                )[0];
                orders.forEach((getOrderCard) => {
                    getOrderCard(parent, '/profile/order');
                });
            })
            .catch(() => {});
    }
}
