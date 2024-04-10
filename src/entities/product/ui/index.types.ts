export type ProductCardType = 'horizontal' | 'vertical';

export interface ProductProps {
    className: string;
    id: number;
    style: ProductCardType;
    src: string;
    name: string;
    price: number;
}

/*
 * export interface ProductProps {
 *     className: string;
 *     style: ProductCardType;
 *     src: string;
 *     name: string;
 *     price: number;
 * }
 */
