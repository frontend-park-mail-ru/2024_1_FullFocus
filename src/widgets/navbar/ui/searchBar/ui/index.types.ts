export interface SearchBarProps {
    className: string;
    navigateSearchPage: (params: { [name: string]: string }) => void;
    navigateCategoryPage: (params: { [name: string]: string }) => void;
    onFocus?: (e: Event) => void;
    onBlur?: (e: Event) => void;
}
