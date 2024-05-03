export interface CommentWidgetProps {
    addCommentCallback?: () => void;
    className: string;
    productID: string;
    params?: { [name: string]: string };
    productSrc: string;
    productDescription: string;
}
