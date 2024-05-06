import { IComment, commentRequest } from '@/entities/comment';
import { CommentCard } from '@/entities/comment';
import { ProductCard } from '@/entities/product';
import { getProfilePicture } from '@/entities/user/api';

function renderItem(comment: IComment, parent: Element, src: string) {
    if (src===''){
        const Card = new CommentCard(parent, {
            className: 'comment-section_' + comment.reviewID.toString(),
            avatar: "/public/default-profile-pic.png",
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

    const Card = new CommentCard(parent, {
        className: 'comment-section_' + comment.reviewID.toString(),
        avatar: src,
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
                    UseGetProfilePicture(comment.profileAvatar).then(
                        (src) => {
                            comments.push((parent: Element) => {
                                return renderItem(comment, parent, src);
                            });
                        }
                    ).catch(() => {

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

export async function UseGetProfilePicture(
    id: string
){
    let imgSrc = '';
    if (id.length != 0) {
        const profilePicture = await getProfilePicture(
            id,
        );
        if (profilePicture.status === 200) {
            imgSrc = URL.createObjectURL(profilePicture.data);
        }
    }
    return imgSrc
}


