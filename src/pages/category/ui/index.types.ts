export interface CategoryPageProps {
    className: string;
    categoryId: number;
    sortId?: number;
    navigateToMain: () => void;
    navigateToCategory: (attrs: {[name: string]: string}) => void;
}
