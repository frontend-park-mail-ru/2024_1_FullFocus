import './index.style.scss';
import profilePromocodesInfoTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ProfilePromocodesInfoProps } from './index.types';
import { useGetAllPromocodes } from '@/features/promocodes';
import { List } from '@/shared/uikit/list';
import { PromocodeCard } from '@/entities/promocode';


export class ProfilePromocodesInfo extends Component<
    HTMLDivElement,
    ProfilePromocodesInfoProps
> {
    protected promocodes: List<PromocodeCard>;

    protected componentDidMount(){
        // @ts-ignore
        void navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
            if (result.state === "granted" || result.state === "prompt") {

                this.promocodes.htmlElement.addEventListener(
                    'click', (e)=>{
                        const target = e.target as HTMLElement
                        if (target.dataset['code']!=undefined){
                            navigator.clipboard.writeText(target.dataset['code']).then(
                                () => {
                                    /* clipboard successfully set */
                                },
                                () => {
                                    /* clipboard write failed */
                                },
                            );
                        }
                    }
                )
            }
        });

    };

    constructor(parent: Element, props: ProfilePromocodesInfoProps) {
        super(parent, profilePromocodesInfoTmpl, props);
    }

    protected render() {
        this.renderTemplate();

        this.promocodes = new List<PromocodeCard>(
            this.htmlElement.getElementsByClassName(
                'profile-promocodes-info__main-info',
            )[0],
            { className: 'promocodes-results', wrap: true },
        );
        useGetAllPromocodes().then(
            (items) => {
                if (items.length > 0) {
                    this.promocodes.renderItems(items);
                } else{
                    this.htmlElement.innerText = 'Промиков не имеем'
                }
                this.componentDidMount();
            }
        ).catch(() => {
            this.htmlElement.innerText = 'Что-то пошло не так'
        });

    }
}
