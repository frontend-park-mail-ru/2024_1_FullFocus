export type BadgeColor = 'red' | 'green' | 'blue';
export type Position = 'normal' | 'top-right' | 'center-right';

export interface BadgeProps {
    className: string;
    text: string;
    color?: BadgeColor;
    width?: string;
    position?: Position;
}
