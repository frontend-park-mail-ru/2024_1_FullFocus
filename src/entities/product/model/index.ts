export interface IProduct {
    id: number;
    name: string;
    price: number;
    imgLink: string;
    category: string;
    description: string;
    oldPrice?: string;
    benefitValue?: string;
    benefitType?: string;
}