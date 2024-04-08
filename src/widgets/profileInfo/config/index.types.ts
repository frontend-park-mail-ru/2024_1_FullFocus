import { Component } from '@/shared/@types/index.component';

export interface IProps {
    className: string;
    orderId?: number;
    profileChangedCallback?: () => void;
}

export interface profileInfoConfig {
    [name: string]: {
        href: string;
        text?: string;
        getComponent: (parent: Element, props: IProps) => Component<Element>;
    };
}
