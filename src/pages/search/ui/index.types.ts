export interface SearchPageProps {
    className: string;
    query: string;
    sortId?: string;
    navigateToMain: () => void;
    navigateToCart: () => void;
    navigateToSearch: (attrs: { [name: string]: string }) => void;
}
