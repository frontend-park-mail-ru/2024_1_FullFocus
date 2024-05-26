import './index.style.scss';
import toastCardTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ToastCardProps } from './index.types';

export type { CardType } from './index.types';

export class ToastCard<T extends Component<Element>> extends Component<
    HTMLOutputElement,
    ToastCardProps<T>
> {
    protected innerComponent: T;

    constructor(parent: Element, props: ToastCardProps<T>) {
        super(parent, toastCardTmpl, props);
    }

    protected render() {
        this.props.style = this.props.style ?? 'normal';

        this.renderTemplate();
        this.innerComponent = this.props.componentToRender(
            this.htmlElement.getElementsByClassName('toast-card__message')[0],
        );
    }

    protected animateDissapear() {
        const height = this.htmlElement.getBoundingClientRect().height;
        return this.htmlElement.animate(
            [
                { marginBottom: '0', opacity: 1 },
                {
                    marginBottom: `-${height}px`,
                    opacity: 0,
                    zIndex: -1,
                },
            ],
            {
                duration: 300,
                easing: 'ease',
            },
        );
    }

    destroy() {
        this.animateDissapear().onfinish = () => {
            this.innerComponent.destroy();
            this.innerComponent = null;
            this.htmlElement.remove();
        };
    }
}
