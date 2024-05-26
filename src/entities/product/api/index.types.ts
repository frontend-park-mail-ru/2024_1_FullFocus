export interface IProductResponse {
    id: number;
    name: string;
    imgSrc: string;
    seller: string;
    rating: number;
    amount: number;
    "oldPrice": number,
    "description": string,
    "categories": string[]
    "benefitType": string,
    "benefitValue": number,
    "newPrice": number
}

export interface IProductResponseRecommendation {
    id: number,
    name: string,
    oldPrice: number,
    imgSrc: string,
    seller: string,
    rating: number,
    benefitType: string,
    benefitValue: number,
    newPrice: number,
    amount: number,
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
