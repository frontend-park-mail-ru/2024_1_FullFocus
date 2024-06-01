import './index.style.scss';
import profilePromocodesInfoTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfilePromocodesInfoProps } from './index.types';
import { useGetAllPromocodes } from '@/features/promocodes';
import { List } from '@/shared/uikit/list';
import { PromocodeCard } from '@/entities/promocode';
import { toast } from '@/shared/uikit/toast';
import { animateLongRequest } from '@/shared/api/ajax/throttling';

export class ProfilePromocodesInfo extends Component<
    HTMLDivElement,
    ProfilePromocodesInfoProps
> {
    protected promocodes: List<PromocodeCard>;
    protected addToast: (header: string, text: string) => void;

    constructor(parent: Element, props: ProfilePromocodesInfoProps) {
        super(parent, profilePromocodesInfoTmpl, props);
        this.addToast = toast().addSuccess;
    }

    protected componentDidMount() {
        this.promocodes.htmlElement.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const code = target.dataset['code'];
            if (code !== undefined) {
                navigator.clipboard.writeText(code).then(
                    () => {
                        this.addToast(
                            'Успешно!',
                            `Промокод ${code} скопирован`,
                        );
                    },
                    () => {},
                );
            }
        });
    }

    protected render() {
        this.renderTemplate();

        this.promocodes = new List<PromocodeCard>(
            this.htmlElement.getElementsByClassName(
                'profile-promocodes-info__main-info',
            )[0],
            { className: 'promocodes-results', wrap: true },
        );

        animateLongRequest(
            useGetAllPromocodes,
            (items) => {
                if (items.length > 0) {
                    this.promocodes.renderItems(items);
                } else {
                    (
                        this.htmlElement.getElementsByClassName(
                            'profile-promocodes-info__main-info',
                        )[0] as HTMLDivElement
                    ).innerText = 'Пока что у вас нет доступных промокодов';
                }
                this.componentDidMount();
            },
            () => {
                (
                    this.htmlElement.getElementsByClassName(
                        'profile-promocodes-info__main-info',
                    )[0] as HTMLDivElement
                ).innerText = 'Что-то пошло не так';
            },
            () => {
                this.promocodes.setLoading('300px');
            },
            () => {
                this.promocodes.removeLoading();
            },
            150,
            1000,
        )();
    }
}
