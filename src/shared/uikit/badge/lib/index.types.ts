import { Component } from '@/shared/@types/index.component';
import { Position } from '../ui/index.types';

export interface WithBadgeProps<InnerElement extends Component<Element>> {
    className: string;
    badgeText?: string;
    position?: Position;
    elementToBadge: (parent: Element) => InnerElement;
}
