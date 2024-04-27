import { IComment, commentRequest } from '@/entities/comment';
import { CommentCard } from '@/entities/comment';
import { ProductCard } from '@/entities/product';

function renderItem(comment: IComment, parent: Element) {
    const Card = new CommentCard(parent, {
        className: "comment-section",
        avatar: comment.avatar,
        name: comment.name,
        advantages: comment.advantages,
        disadvantages: comment.disadvantages,
        comment: comment.comment,
        date: comment.date,
        mark: comment.mark,
    });
    return Card;
}

export async function useGetCommentCards(lastReviewID: number, limit: number) {
    return commentRequest(lastReviewID, limit)
        .then(({ status, data}) => {
            const comments: Array<
                (parent: Element) => CommentCard
            > = [];
            if (status === 200) {
                data.commentCards.forEach((comment) => {
                    comments.push((parent: Element) => {
                        return renderItem(comment, parent);
                    });
                });
            }
            return comments;
        })
        .catch(() => {
            const comments: Array<
                (parent: Element) => ProductCard
            > = [];
            return comments;
        });
}