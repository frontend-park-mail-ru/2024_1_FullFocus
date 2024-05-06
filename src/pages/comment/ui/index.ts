import { Component } from '@/shared/@types/index.component';
import { CommentPageProps } from '@/pages/comment/ui/index.types';
import CommentPageTmpl from'./index.template.pug';
// import { CommentWidget } from '@/widgets/comment';
import './index.template.scss';
import { SortWidget } from '@/widgets/sort/ui';

export class CommentPage extends Component<HTMLDivElement, CommentPageProps> {
    // protected commentWidget: CommentWidget;
    protected sortWidget: SortWidget;

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
        /*
         * this.commentWidget = new CommentWidget(
         *   this.htmlElement,
         *   {
         *       className: 'comment-section',
         *      productID: "15",
         *       productDescription: "Ночник детский силиконовый для сна капибара",
         *       productSrc: "/public/default-profile-pic.png"
         *   },
         * )
         */

    }
}