import { Component } from '@/shared/@types/index.component';
import { CommentProps } from '@/widgets/comment/ui/index.types';
import commentTmpl from '@/widgets/comment/ui/index.template.pug';
import './index.template.scss';
import { CommentCard } from '@/entities/comment/ui';


export class Comment extends Component<HTMLDivElement, CommentProps> {
    protected commentCard: CommentCard;
    constructor(parent: Element, props: CommentProps) {
        super(parent, commentTmpl, props);
    }

    protected render() {
        this.renderTemplate();
        this.commentCard = new CommentCard(
            this.htmlElement,
            {
                className: "comment-section",
                avatar: "/public/default-profile-pic.png",
                name: "Alex Nikitin",
                advantages: "ОГОНЬ",
                disadvantages: "Дороговато",
                comment: "Мне очень понравилось",
                date: "14 апреля 2023 года",
                mark: 3.5,
            },
        )
    }
}
