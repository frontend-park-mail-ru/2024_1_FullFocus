export interface CartProps {
    className: string;
    navigateToMainPage: () => void;
    navigateToOrderPage: (params?: { [name: string]: string }) => void;
}
