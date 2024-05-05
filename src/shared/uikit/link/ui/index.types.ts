export type LinkStyle = 'basic' | 'with-bg' | 'btn' | 'primary';

export interface LinkProps {
    className: string;
    href: string;
    text: string;
    iconTmpl?: () => string;
    iconOnly?: boolean;
    imgName?: string;
    style?: LinkStyle;
}
