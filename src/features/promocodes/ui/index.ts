import {
    PromocodeCard,
    promocodeActivationInfo,
    promocodesAll,
} from '@/entities/promocode';
import { animateLongRequest } from '@/shared/api/ajax/throttling';
import { DropDown } from '@/shared/uikit/dropdown';
import { Promocode } from '@/entities/promocode/api/index.types';

function renderItem(parent: Element, promocode: Promocode) {
    return new PromocodeCard(parent, {
        className: `$code-[${promocode.code}]`,
        id: promocode.id,
        style: 'full',
        code: promocode.code,
        description: promocode.description,
        timeLeft:
            promocode.timeLeft.split(' ')[0] +
            ' ' +
            promocode.timeLeft.split(' ')[1],
    });
}

export function useGetPromocodesDropdown(parent: Element, className: string) {
    const dropdown = new DropDown<PromocodeCard>(parent, {
        className: className,
        defaultText: 'Ваши промокоды',
        size: 'fill',
        border: true,
        dispatchOpenEvent: true,
    });

    dropdown.htmlElement.addEventListener(dropdown.firstOpenEventName, () => {
        animateLongRequest(
            promocodesAll,
            ({ status, data }) => {
                if (status === 200) {
                    data.forEach((item) => {
                        dropdown.addItem((parent: Element) => {
                            const card = new PromocodeCard(parent, {
                                className: `${className}__code-[${item.code}]`,
                                id: item.id,
                                style: 'small',
                                code: item.code,
                                description: item.description,
                            });
                            card.htmlElement.dataset['code'] = item.code;
                            return {
                                item: card,
                                id: item.code,
                            };
                        });
                    });
                }

                if (status !== 200) {
                    dropdown.setUnopened();
                }
            },
            () => {
                dropdown.setUnopened();
            },
            () => {
                dropdown.startLoading();
                dropdown.addEmptyBg();
            },
            () => {
                dropdown.stopLoading();
            },
            200,
            500,
        )();
    });

    return dropdown;
}

export async function useGetPromocodeCardByCode(code: string) {
    const response = await promocodeActivationInfo(code);
    if (response.status === 200) {
        return {
            activationInfo: response.data,
            card: (parent: Element, className: string) =>
                new PromocodeCard(parent, {
                    className: className,
                    id: response.data.id,
                    style: 'small',
                    code: code,
                    description: response.data.description,
                }),
        };
    }
    if (response.status !== 200) {
        return null;
    }
}

export function useGetAllPromocodes() {
    return promocodesAll()
        .then(({ status, data }) => {
            const promocodes: Array<
                (parent: Element) => {
                    item: PromocodeCard;
                    id: string;
                }
            > = [];
            if (status === 200) {
                data.forEach((promocode) => {
                    promocodes.push((parent: Element) => {
                        const id = promocode.id.toString();
                        return {
                            item: renderItem(parent, promocode),
                            id: id,
                        };
                    });
                });
            }
            return promocodes;
        })
        .catch(() => {
            const promocodes: Array<
                (parent: Element) => {
                    item: PromocodeCard;
                    id: string;
                }
            > = [];
            return promocodes;
        });
}
