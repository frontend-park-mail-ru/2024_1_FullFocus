export type BenefitType = 'percentage';

export type PromocodeById = {
    id: number;
    description: string;
    minSumGive: number;
    minSumActivation: number;
    benefitType: BenefitType;
    value: number;
    ttl: 240;
};

export type PromocodeActivationInfo = {
    id: number;
    min_sum_activation: number;
    benefit_type: BenefitType;
    value: number;
};

export type Promocode = {
    id: number;
    description: string;
    code: string;
    minSumActivation: number;
    benefitType: BenefitType;
    value: number;
    timeLeft: string;
};
