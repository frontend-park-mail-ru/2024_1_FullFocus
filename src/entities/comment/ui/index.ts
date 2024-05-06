import './index.style.scss';
import commentCardTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { CommentCardProps } from './index.types';
import { Rating } from '@/shared/uikit/starRating';

export class CommentCard extends Component<HTMLDivElement, CommentCardProps> {
    protected starRating: Rating;

    constructor(parent: Element, props: CommentCardProps) {
        super(parent, commentCardTmpl, props);
    }

    protected render() {
        this.renderTemplate();

        this.starRating = new Rating(
            this.htmlElement.getElementsByClassName(
                'comment-card__info-mark',
            )[0],
            {
                className: 'star-rating',
                rating: this.props.mark,
                maxRating: 5,
                size: 60,
                fullColorHex: '#FCD53F',
                emptyColorHex: '#E2E6E9',
            },
        );
    }
}
