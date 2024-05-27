import { ajaxGet, ajaxPost } from '@/shared/api';
import { IaddComment, IComment } from './index.types';
import { COMMENTS_API_URL } from './index.constants';

export async function commentRequest(
    lastReviewID: number,
    limit: number,
    ProductID: string,
) {
    return ajaxGet<Array<IComment>>(COMMENTS_API_URL.getComments + ProductID, [
        { key: 'lastReviewID', value: lastReviewID.toString() },
        { key: 'limit', value: limit.toString() },
    ]);
}

export async function addComment(body: IaddComment) {
    return ajaxPost<null>(COMMENTS_API_URL.addComment, [], {
        productID: body.productID,
        rating: body.rating,
        comment: body.comment,
        advantages: body.advantages,
        disadvantages: body.disadvantages,
    });
}
