export interface CategoryPageProps {
    className: string;
    categoryId: number;
    sortId?: number;
    navigateToMain: () => void;
    navigateToCart: () => void;
    navigateToCategory: (attrs: {[name: string]: string}) => void;
}
