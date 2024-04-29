export interface addCommentDialogProps {
    params: { [name: string]: string };
    className: string;
    rating: string;
    advantages: string;
    disadvantages: string;
    comment: string;
    addCommentCallback?: () => void;
}