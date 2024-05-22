import { BenefitType } from '@/entities/promocode';

export interface CartInfoProps {
    className: string;
    discountInfo?: {
        minSum: number;
        benefitType: BenefitType;
        value: number;
    };
    orderCreatedCallback: () => void;
    navigateToMainPage: () => void;
    navigateToOrderPage: () => void;
}
