import { IComment, commentRequest } from '@/entities/comment';
import { CommentCard } from '@/entities/comment';
import { ProductCard } from '@/entities/product';

function renderItem(comment: IComment, parent: Element) {
    const Card = new CommentCard(parent, {
        className: 'comment-section_' + comment.reviewID.toString(),
        avatar: comment.profileAvatar,
        name: comment.profileName,
        advantages: comment.advanatages,
        disadvantages: comment.disadvantages,
        comment: comment.comment,
        date: comment.createdAt.substring(0, 10),
        mark: comment.rating,
        id: comment.reviewID,
    });
    return Card;
}

export async function useGetCommentCards(
    lastReviewID: number,
    limit: number,
    ProductID: string,
) {
    return commentRequest(lastReviewID, limit, ProductID)
        .then(({ status, data }) => {
            const comments: Array<(parent: Element) => CommentCard> = [];
            if (status === 200) {
                data.forEach((comment) => {
                    comments.push((parent: Element) => {
                        return renderItem(comment, parent);
                    });
                });
            }
            return comments;
        })
        .catch(() => {
            const comments: Array<(parent: Element) => ProductCard> = [];
            return comments;
        });
}
