export type LinkStyle = 'basic' | 'with-bg' | 'btn' | 'primary';

export interface LinkProps {
    className: string;
    href: string;
    text: string;
    iconName?: string;
    imgName?: string;
    style?: LinkStyle;
}
