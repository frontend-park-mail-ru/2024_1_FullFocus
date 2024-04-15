type LinkStyle = 'basic' | 'with-bg';

export interface LinkProps {
    className: string;
    href: string;
    text: string;
    iconName?: string;
    style?: LinkStyle;
}
