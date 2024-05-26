export type BenefitType = 'percentSale' | 'priceSale' | 'finalPrice';

export interface IProductResponse {
    id: number;
    name: string;
    price: number;
    imgSrc: string;
    seller: string;
    rating: number;
    amount: number;
}

export interface IProductResponseRecommendation {
    id: number;
    name: string;
    oldPrice: number;
    imgSrc: string;
    seller: string;
    rating: number;
    benefitType: BenefitType;
    benefitValue: number;
    newPrice: number;
    amount: number;
}

export interface IOneProductResponseR {
    id: number;
    name: string;
    oldPrice: number;
    description: string;
    imgSrc: string;
    seller: string;
    rating: number;
    amount: number;
    categories: string[];
    benefitType: BenefitType;
    benefitValue: number;
    newPrice: number;
}

// TODO make it to the actual request
export interface ProductByCategoriesResponse {
    categoryName: string;
    productCards: IProductResponse[];
}

export interface ProductsBySearchResponse {
    query: string;
    productCards: IProductResponse[];
}

export interface SuggestionCategory {
    id: number;
    name: string;
}

export interface Suggestions {
    categories: SuggestionCategory[];
    products: string[];
}
