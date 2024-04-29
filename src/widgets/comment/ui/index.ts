import { Component } from '@/shared/@types/index.component';
import { CommentWidgetProps } from '@/widgets/comment/ui/index.types';
import commentWidgetTmpl from '@/widgets/comment/ui/index.template.pug';
import './index.template.scss';
import { CommentCard } from '@/entities/comment/ui';
import { Button } from '@/shared/uikit/button';
import { useGetCommentCards } from '@/features/comment/ui';
import { EmptyContainer } from '@/shared/uikit/emptyContainer';
import { AddCommentDialog } from './addCommentDialog';


export class CommentWidget extends Component<HTMLDivElement, CommentWidgetProps> {
    protected btn: Button;
    protected commentsColumn: CommentCard[];
    protected dialog: AddCommentDialog;
    constructor(parent: Element, props: CommentWidgetProps) {
        super(parent, commentWidgetTmpl, props);
    }


    renderSection() {
        this.commentsColumn = []
        useGetCommentCards(
            Number(this.props.params["limit"]),
            Number(this.props.params["lastReviewID"]),
            this.props.ProductID
        )
            .then((comments: ((parent: Element) => CommentCard)[]) => {
                if (comments.length === 0) {

                    const emptyCommentDiv = new EmptyContainer(
                        this.htmlElement.getElementsByClassName(
                            "comment-widget__comments"
                        )[0],
                        {
                            className: 'comment-widget__commentsEMPTY',
                        }
                    )
                    emptyCommentDiv.htmlElement.innerText = 'Будьте первым, кто оставит комментарий!';
                }
                for (let i=0; i<comments.length; i++) {
                    const commentCard = comments[i](
                        this.htmlElement.getElementsByClassName(
                            "comment-widget__comments"
                        )[0]
                    );
                    this.commentsColumn[i] = commentCard;
                }
            })
            .catch((error) => {
                console.error("Ошибка при загрузке комментариев:", error);
            });
    }

    protected render() {
        this.renderTemplate();
        this.btn = new Button(
            this.htmlElement.getElementsByClassName('comment-widget__info')[0],
            {
                className: 'page-widget__bottom',
                btnText: 'Оставить отзыв',
                type: 'button',
                btnStyle: 'bright'
            });
        this.renderSection();
    }
}
