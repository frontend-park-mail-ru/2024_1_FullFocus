import './index.style.scss';
import counterTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { CounterProps } from './index.types';

export class Counter extends Component<HTMLDivElement, CounterProps> {
    protected listener: (e: Event) => void;
    protected countDiv: HTMLDivElement;
    protected count: number;

    constructor(parent: Element, props: CounterProps) {
        super(parent, counterTmpl, props);
        this.count = 0;
    }

    increase() {
        this.counterValue = this.count + 1;
    }

    decrease() {
        if (this.count > this.props.min) {
            this.counterValue = this.count - 1;
        }
    }

    performAction(action: string) {
        if (action === 'plus') {
            this.increase();
        }

        if (action === 'minus') {
            this.decrease();
        }
    }

    private componentDidMount() {
        this.listener = (e: Event) => {
            e.preventDefault();
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'button' ||
                target.classList.contains('btn__text')
            ) {
                this.performAction(target.dataset.action);
            }
        };

        this.htmlElement.addEventListener('click', this.listener);
    }

    protected render() {
        this.props.min = this.props.min ? this.props.min : 1;

        this.renderTemplate();

        this.countDiv = this.htmlElement.getElementsByClassName(
            'counter__data',
        )[0] as HTMLDivElement;
    }

    set counterValue(value: number) {
        this.count = value;
        this.countDiv.innerText = this.count.toString();
    }

    get counterData() {
        return this.count;
    }
}
