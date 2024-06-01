import './index.style.scss';
import profileOrdersInfoTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfileOrdersInfoProps } from './index.types';
import { useGetAllOrdersCards } from '@/features/order';
import { getWS } from '@/features/notification';
import { OrderCard } from '@/entities/order/ui/orderCard';
import { List } from '@/shared/uikit/list';
import { OrderStatus } from '@/entities/order/model';
import { animateLongRequest } from '@/shared/api/ajax/throttling';

export class ProfileOrdersInfo extends Component<
    HTMLDivElement,
    ProfileOrdersInfoProps
> {
    protected ordersList: List<OrderCard>;

    constructor(parent: Element, props: ProfileOrdersInfoProps) {
        super(parent, profileOrdersInfoTmpl, props);
    }

    protected componentDidMount() {
        getWS().addCallback('updateorder', (message) => {
            this.ordersList
                .itemById(message.orderID.toString())
                .changeStatus(message.newStatus as OrderStatus);
        });
    }

    protected updateCards() {
        if (this.ordersList !== undefined) {
            this.ordersList.clear();
        }

        if (this.ordersList === undefined) {
            this.ordersList = new List<OrderCard>(this.htmlElement, {
                className: 'profile-orders-info__main-info',
                wrap: false,
                gap: '8px',
            });
        }
        animateLongRequest(
            useGetAllOrdersCards,
            (orders) => {
                orders.forEach((getOrderCard) => {
                    this.ordersList.pushItem((parent: Element) =>
                        getOrderCard(parent, '/profile/order'),
                    );
                });
                if (orders.length === 0) {
                    this.ordersList.setEmptyText();
                }
            },
            () => {},
            () => {
                this.ordersList.setLoading('300px');
            },
            () => {
                this.ordersList.removeLoading();
                this.ordersList.newEmptyText('Здесь пока что ничего нет');
            },
            150,
            1000,
        )();
    }

    protected render() {
        this.renderTemplate();
        this.updateCards();
    }
}
