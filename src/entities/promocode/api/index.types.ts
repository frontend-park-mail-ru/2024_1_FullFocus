export type PromocodeById<
    BenefitType = 'percentSale' | 'priceSale' | 'finalPrice',
> = {
    id: number;
    description: string;
    minSumGive: number;
    minSumActivation: number;
    benefitType: BenefitType;
    value: number;
    ttl: 240;
};

export type PromocodeActivationInfo<
    BenefitType = 'percentSale' | 'priceSale' | 'finalPrice',
> = {
    id: number;
    min_sum_activation: number;
    benefit_type: BenefitType;
    value: number;
    description: string;
};

export type Promocode<
    BenefitType = 'percentSale' | 'priceSale' | 'finalPrice',
> = {
    id: number;
    description: string;
    code: string;
    minSumActivation: number;
    benefitType: BenefitType;
    value: number;
    timeLeft: string;
};
