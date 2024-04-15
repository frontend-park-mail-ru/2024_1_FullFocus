export interface MainPageProps {
    className: string;
    params?: { [name: string]: string };
    navigateToCart: () => void;
}
