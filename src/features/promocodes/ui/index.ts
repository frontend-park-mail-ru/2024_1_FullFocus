import {
    PromocodeCard,
    promocodeActivationInfo,
    promocodeById,
    promocodesAll,
} from '@/entities/promocode';
import { animateLongRequest } from '@/shared/api/ajax/throttling';
import { DropDown } from '@/shared/uikit/dropdown';

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
            500,
            500,
        )();
    });

    return dropdown;
}

export async function useGetPromocodeCardByCode(code: string) {
    const response = await promocodeActivationInfo(code);
    if (response.status === 200) {
        const responseDetailed = await promocodeById(response.data.id);
        if (responseDetailed.status === 200) {
            return {
                activationInfo: responseDetailed.data,
                card: (parent: Element, className: string) =>
                    new PromocodeCard(parent, {
                        className: className,
                        id: responseDetailed.data.id,
                        style: 'small',
                        code: code,
                        description: responseDetailed.data.description,
                    }),
            };
        }
    }

    if (response.status !== 200) {
        return null;
    }
}
