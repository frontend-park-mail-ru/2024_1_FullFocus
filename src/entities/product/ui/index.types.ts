export type ProductCardType = 'horizontal' | 'vertical';

export interface ProductProps {
    className: string;
    id: number;
    style: ProductCardType;
    src: string;
    name: string;
    price: number;
    rating?: number;
    oldPrice?: number;
    sale?: number;
}
