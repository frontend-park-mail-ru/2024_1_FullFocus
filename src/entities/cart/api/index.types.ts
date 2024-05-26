interface IProductInCart<
    BenefitValue = 'percentSale' | 'priceSale' | 'finalPrice',
> {
    productId: number;
    name: string;
    oldPrice: number;
    newPrice: number;
    imgsrc: string;
    count: number;
    cost: number;
    benefitType: BenefitValue;
    benefitValue: number;
}

export interface ICartData<
    BenefitValue = 'percentSale' | 'priceSale' | 'finalPrice',
> {
    totalCount: number;
    totalCost: number;
    products: IProductInCart<BenefitValue>[];
}
