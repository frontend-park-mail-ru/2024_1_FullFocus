export interface NavbarProps {
    className: string;
    withSearch?: boolean;
    type?: 'mobile' | 'desktop';
    navigateSearchPage?: (params: { [name: string]: string }) => void;
    navigateCategoryPage?: (params: { [name: string]: string }) => void;
}

export type UserLogged = 'logged' | 'unlogged' | 'both';
