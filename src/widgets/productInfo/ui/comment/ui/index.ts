import { Component } from '@/shared/@types/index.component';
import { CommentWidgetProps } from './index.types';
import commentWidgetTmpl from './index.template.pug';
import './index.style.scss';
import { CommentCard } from '@/entities/comment/ui';
import { Button } from '@/shared/uikit/button';
import { useGetCommentCards } from '@/features/comment/ui';
import { EmptyContainer } from '@/shared/uikit/emptyContainer';
import { AddCommentDialog } from './addCommentDialog';
import { useCheckUserLogin } from '@/features/auth';
import { animateLongRequest } from '@/shared/api/ajax/throttling';

export class CommentWidget extends Component<
    HTMLDivElement,
    CommentWidgetProps
> {
    protected btn: Button;
    protected commentsColumn: CommentCard[];
    protected dialog: AddCommentDialog;
    protected listener: (e: Event) => void;

    constructor(parent: Element, props: CommentWidgetProps) {
        super(parent, commentWidgetTmpl, props);
    }

    protected componentDidMount() {}

    renderDialog() {
        useCheckUserLogin()
            .then((isLogged) => {
                this.dialog = new AddCommentDialog(this.htmlElement, {
                    className: 'comment-widget__add-dialog',
                    productID: this.props.productID,
                    productDescription: this.props.productDescription,
                    productSrc: this.props.productSrc,
                    isAuth: isLogged,
                    addProductCallback: () => {
                        this.renderSection();
                        if (this.props.commentAddedCallback) {
                            this.props.commentAddedCallback();
                        }
                    },
                });
            })
            .catch(() => {});
    }

    renderSection() {
        this.commentsColumn.forEach((comment) => {
            comment.destroy();
        });
        this.commentsColumn = [];
        animateLongRequest(
            () => {
                return useGetCommentCards(
                    0, // Number(this.props.params["limit"])
                    5, // Number(this.props.params["lastReviewID"])
                    this.props.productID,
                );
            },
            (comments: ((parent: Element) => CommentCard)[]) => {
                if (comments.length === 0) {
                    const emptyCommentDiv = new EmptyContainer(
                        this.htmlElement.getElementsByClassName(
                            'comment-widget__comments',
                        )[0],
                        {
                            className: 'comment-widget__commentsEMPTY',
                        },
                    );
                    emptyCommentDiv.htmlElement.innerText =
                        'Будьте первым, кто оставит комментарий!';
                }
                for (let i = 0; i < comments.length; i++) {
                    const commentCard = comments[i](
                        this.htmlElement.getElementsByClassName(
                            'comment-widget__comments',
                        )[0],
                    );
                    this.commentsColumn[i] = commentCard;
                }
            },
            () => {},
            () => {
                this.startLoading();
            },
            () => {
                this.stopLoading();
            },
            150,
            1500,
        )();
    }

    renderBtn() {
        useCheckUserLogin()
            .then((isLogged) => {
                if (isLogged) {
                    this.btn = new Button(
                        this.htmlElement.getElementsByClassName(
                            'comment-widget__info',
                        )[0],
                        {
                            className: 'page-widget__bottom',
                            btnText: 'Оставить отзыв',
                            type: 'button',
                            btnStyle: 'white',
                            size: 'sm',
                        },
                    );
                    this.listener = () => {
                        this.dialog.open();
                    };
                    this.btn.htmlElement.addEventListener(
                        'click',
                        this.listener,
                    );
                }
            })
            .catch(() => {});
    }

    startLoading() {
        this.htmlElement.classList.add('comment-widget--loading');
    }

    stopLoading() {
        this.htmlElement.classList.remove('comment-widget--loading');
    }

    protected render() {
        this.renderTemplate();
        this.commentsColumn = [];
        this.renderBtn();
        this.renderSection();
        this.renderDialog();
    }
}
