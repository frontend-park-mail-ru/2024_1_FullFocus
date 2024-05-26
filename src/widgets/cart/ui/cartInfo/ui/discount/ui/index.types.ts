import { BenefitType } from '@/entities/promocode';

export type DiscountProps = {
    className: string;
    minSum: number;
    benefitType: BenefitType;
    value: number;
    currentSum: number;
    discountSum?: string;
};
