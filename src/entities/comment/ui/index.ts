import './index.style.scss';
import commentCardTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { CommentCardProps } from './index.types';

export class CommentCard extends Component<HTMLDivElement, CommentCardProps> {
    constructor(parent: Element, props: CommentCardProps) {
        super(parent, commentCardTmpl, props);
    }

    protected render() {
        this.renderTemplate();
    }
}