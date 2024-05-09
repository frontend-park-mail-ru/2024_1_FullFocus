import { Component } from '@/shared/@types/index.component';
import ratingTmpl from './index.template.pug';
import ratingStarTmpl from './index.template.pug';
import { ratingProps } from './index.types';
import './index.style.scss';

export { ratingStarTmpl };

export class Rating extends Component<HTMLDivElement, ratingProps> {
    constructor(parent: Element, props: ratingProps) {
        super(parent, ratingTmpl, props);
    }

    get rating() {
        return this.props.rating;
    }

    protected render() {
        this.props.style = this.props.style ?? 'normal';

        this.renderTemplate();
    }
}
