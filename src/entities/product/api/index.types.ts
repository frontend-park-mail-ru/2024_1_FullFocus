export interface IProductResponse {
    id: number;
    name: string;
    price: number;
    imgSrc: string;
    seller: string;
    rating: number;
    inCart: boolean;
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
