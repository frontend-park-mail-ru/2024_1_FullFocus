export interface SearchPageProps {
    className: string;
    query: string;
    sortId?: number;
    navigateToMain: () => void;
    navigateToCart: () => void;
    navigateToSearch: (attrs: { [name: string]: string }) => void;
}
