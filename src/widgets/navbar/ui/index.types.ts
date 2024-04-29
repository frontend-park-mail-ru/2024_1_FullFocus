export interface NavbarProps {
    className: string;
    navigateSearchPage: (params: { [name: string]: string }) => void;
    navigateCategoryPage: (params: { [name: string]: string }) => void;
}

export type UserLogged = 'logged' | 'unlogged' | 'both';
