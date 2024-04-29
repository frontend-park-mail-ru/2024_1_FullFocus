import { Component } from '@/shared/@types/index.component';
import { CommentPageProps } from '@/pages/comment/ui/index.types';
import CommentPageTmpl from'./index.template.pug';
import { CommentWidget } from '@/widgets/comment';
import './index.template.scss';

export class CommentPage extends Component<HTMLDivElement, CommentPageProps> {
    protected commentWidget: CommentWidget;

    constructor(
        parent: Element,
        params?: { [name: string]: string },
    ) {
        super(parent, CommentPageTmpl, {
            className: 'comment-page',
            params: params,
        });
    }

    protected render() {
        this.renderTemplate();
        this.commentWidget = new CommentWidget(
            this.htmlElement,
            {
                className: 'comment-section',
                ProductID: "15",
                params: {
                    ["limit"]: "10",
                    ["lastReviewID"]: "10",
                },
            },
        )
    }
}