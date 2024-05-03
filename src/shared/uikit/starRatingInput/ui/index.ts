import { Component } from '@/shared/@types/index.component';
import ratingInputTmpl from './index.template.pug';
import { ratingInputProps } from './index.types';
import './index.style.scss'

export class RatingInput extends Component<HTMLDivElement, ratingInputProps> {
    constructor(parent: Element, props: ratingInputProps) {
        super(parent, ratingInputTmpl, props);
    }

    protected render() {
        this.renderTemplate();
    }
}