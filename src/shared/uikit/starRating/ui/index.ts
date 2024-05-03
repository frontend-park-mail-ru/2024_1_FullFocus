import { Component } from '@/shared/@types/index.component';
import ratingTmpl from './index.template.pug';
import { ratingProps } from './index.types';
import './index.style.scss'

export class Rating extends Component<HTMLDivElement, ratingProps> {
    constructor(parent: Element, props: ratingProps) {
        super(parent, ratingTmpl, props);
    }

    protected render() {
        this.renderTemplate();
    }
}