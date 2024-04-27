import { ajaxGet } from '@/shared/api';
import { IComment } from './index.types';
import { COMMENTS_API_URL } from './index.constants';


export async function commentRequest(lastReviewID: number, limit: number) {
    return ajaxGet<{ commentCards: Array<IComment> }>(
        COMMENTS_API_URL.getComments,
        [
            { key: 'lastReviewID', value: lastReviewID.toString() },
            { key: 'limit', value: limit.toString() },
        ],
    );
}
