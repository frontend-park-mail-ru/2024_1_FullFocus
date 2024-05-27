import { BenefitType } from '../api';

export function getSaleByBenefitType(
    oldPrice: number,
    benefitType: BenefitType,
    benefitValue: number,
) {
    let sale = 0;
    switch (benefitType) {
        case 'percentSale':
            sale = benefitValue;
            break;
        case 'finalPrice':
            sale = Math.round(((oldPrice - benefitValue) / oldPrice) * 100);
            break;
        case 'priceSale':
            sale = Math.round((benefitValue / oldPrice) * 100);
    }

    return sale;
}
