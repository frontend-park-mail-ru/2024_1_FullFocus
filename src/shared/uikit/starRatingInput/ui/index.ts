import { Component } from '@/shared/@types/index.component';
import ratingInputTmpl from './index.template.pug';
import { ratingInputProps } from './index.types';
import './index.style.scss';

export class RatingInput extends Component<HTMLDivElement, ratingInputProps> {
    protected chosenRating: number;

    constructor(parent: Element, props: ratingInputProps) {
        super(parent, ratingInputTmpl, props);
        this.chosenRating = 0;
    }

    get currentRating() {
        return this.chosenRating;
    }

    protected componentDidMount() {
        this.htmlElement.addEventListener('change', (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === 'input') {
                this.chosenRating = Number((target as HTMLInputElement).value);
            }
        });
    }

    protected render() {
        this.renderTemplate();
        this.componentDidMount();
    }
}
