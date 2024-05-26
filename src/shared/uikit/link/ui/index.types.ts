export type LinkStyle = 'basic' | 'with-bg' | 'btn' | 'primary';

export interface LinkProps {
    className: string;
    href?: string;
    text: string;
    iconTmpl?: () => string;
    iconOnly?: boolean;
    direction?: 'vertical' | 'horizontal';
    imgName?: string;
    style?: LinkStyle;
    textSize?: 'header' | 'text';
}
