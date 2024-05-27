import { Component } from '@/shared/@types/index.component';

/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
export function getCardIdIfCloseBtn(target: HTMLElement) {
    if (target.dataset['closetoast'] !== undefined) {
        return Number(
            (target.closest('[data-id]') as HTMLElement).dataset['id'],
        );
    }

    return undefined;
}

export function closeToastWrapper<T extends Component<HTMLElement>>(
    component: T,
) {
    component.htmlElement.dataset['closetoast'] = '';
    return component;
}
