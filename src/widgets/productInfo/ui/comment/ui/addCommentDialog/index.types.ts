export interface addCommentDialogProps {
    isAuth: boolean;
    productID: string;
    className: string;
    productSrc: string;
    productDescription: string;
    addProductCallback: () => void;
}
