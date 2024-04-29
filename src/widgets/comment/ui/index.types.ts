export interface CommentWidgetProps {
    addCommentCallback?: () => void;
    className: string;
    ProductID: string;
    params?: { [name: string]: string };
}
