export interface CommentWidgetProps {
    className: string;
    productID: string;
    params?: { [name: string]: string };
    productSrc: string;
    productDescription: string;
    commentAddedCallback?: () => void;
}
