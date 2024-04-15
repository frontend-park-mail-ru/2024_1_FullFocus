interface IProductInCart {
    productId: number;
    name: string;
    price: number;
    imgsrc: string;
    count: number;
    cost: number;
}

export interface ICartData {
    totalCount: number;
    totalCost: number;
    products: IProductInCart[];
}
