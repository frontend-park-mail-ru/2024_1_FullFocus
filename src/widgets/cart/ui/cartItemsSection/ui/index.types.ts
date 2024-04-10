export interface CartItemsSectionProps {
    className: string;
    clearCartCallback: () => void;
    addItemCallback: (id: number) => void;
    removeItemCallback: (id: number) => void;
}
