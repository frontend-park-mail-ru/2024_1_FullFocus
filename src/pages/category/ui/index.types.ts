export interface CategoryPageProps {
    className: string;
    categoryId: number;
    sortId?: string;
    navigateToMain: () => void;
    navigateToCart: () => void;
    navigateToCategory: (attrs: { [name: string]: string }) => void;
}
