import { Component } from '@/shared/@types/index.component';

export interface WithBadgeProps<InnerElement extends Component<Element>> {
    className: string;
    badgeText?: string;
    elementToBadge: (parent: Element) => InnerElement;
}
