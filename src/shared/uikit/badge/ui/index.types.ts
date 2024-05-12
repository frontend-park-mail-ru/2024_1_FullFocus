export type BadgeColor = 'red' | 'green' | 'blue';

export interface BadgeProps {
    className: string;
    text: string;
    color?: BadgeColor;
    width?: string;
    position?: 'normal' | 'top-right';
}
