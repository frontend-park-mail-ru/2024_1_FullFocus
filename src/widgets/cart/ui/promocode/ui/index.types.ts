import { BenefitType } from '@/entities/product';

export interface CartPromocodesProps {
    className: string;
    promocodeUsedCallback: (
        id: number,
        minSum: number,
        benefitType: BenefitType,
        value: number,
    ) => void;
    promocodeCanceledCallback: () => void;
}

export type AksCodeResponse = {
    confirmed: boolean;
    id?: number;
    minSum?: number;
    benefitType?: BenefitType;
    value?: number;
};
