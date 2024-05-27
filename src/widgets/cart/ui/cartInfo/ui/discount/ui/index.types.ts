import { BenefitType } from '@/entities/product';

export type DiscountProps = {
    className: string;
    minSum: number;
    benefitType: BenefitType;
    value: number;
    currentSum: number;
    discountSum?: string;
};
