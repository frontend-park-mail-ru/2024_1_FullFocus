import { Component } from '@/shared/@types/index.component';

export type CardType = 'normal' | 'error' | 'success';

export type ToastCardProps<T extends Component<Element>> = {
    className: string;
    componentToRender: (parnet: Element) => T;
    id: number;
    header: string;
    style?: CardType;
};
