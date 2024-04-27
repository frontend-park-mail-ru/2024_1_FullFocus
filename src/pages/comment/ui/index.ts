import { Component } from '@/shared/@types/index.component';
import { CommentPageProps } from '@/pages/comment/ui/index.types';
import CommentPageTmpl from'./index.template.pug';
import { Comment } from '@/widgets/comment';
import './index.template.scss';

export class CommentPage extends Component<HTMLDivElement, CommentPageProps> {
    protected comment: Comment;

    constructor(
        parent: Element,
        params?: { [name: string]: string },
    ) {
        super(parent, CommentPageTmpl, { // Конструктор род класса компонента
            className: 'comment-page',
            params: params,
        });
    }

    protected render() {
        this.renderTemplate();
        this.comment = new Comment(
            this.htmlElement,
            {
                className: 'comment-section',
                params: this.props.params,
            },
        )
    }
}