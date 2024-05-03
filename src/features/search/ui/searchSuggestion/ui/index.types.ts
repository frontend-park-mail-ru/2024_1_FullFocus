export type SearchResultType = 'item' | 'category';

export interface SearchResultProps {
    className: string;
    text: string;
    type: SearchResultType;
    categoryId?: string;
}
