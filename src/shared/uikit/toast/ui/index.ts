import './index.style.scss';
import toastTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { ToastProps } from './index.types';
import { ToastCard } from './toastCard';
import { DefaultMessage } from './defaultToastMessage';
import { getCardIdIfCloseBtn } from './toastCard';
import { CardType } from './toastCard/ui';

export { closeToastWrapper } from './toastCard';

const DEFAULT_MAX_TOAST_CARDS = 5;
const DEFAULT_TIME_TO_LIVE = 5000;
const TIME_TO_LIVE_MORE = 3000;

export class Toast extends Component<HTMLDivElement, ToastProps> {
    protected toastCards: Map<number, ToastCard<Component<Element>>>;
    protected timeout: Map<number, NodeJS.Timeout | null>;
    protected nextId: number;

    constructor(parent: Element, props: ToastProps) {
        super(parent, toastTmpl, props);

        this.props.maxToastCards =
            this.props.maxToastCards ?? DEFAULT_MAX_TOAST_CARDS;
        this.toastCards = new Map();
        this.timeout = new Map();
        this.nextId = 0;
    }

    addMessage(
        header: string,
        text: string,
        style: CardType,
        timeToLive?: number,
    ) {
        this.addCustomMessage(
            header,
            style,
            (parent: Element) => {
                return new DefaultMessage(parent, {
                    className: `message-${this.toastCards.size}`,
                    text: text,
                });
            },
            timeToLive,
        );
    }

    addCustomMessage(
        header: string,
        style: CardType,
        message: (parent: Element) => Component<Element>,
        timeToLive?: number,
    ) {
        if (this.toastCards.size < this.props.maxToastCards) {
            // Render new card
            const id = this.getNextMsgId();

            const first = this.htmlElement.offsetHeight;

            const newToast = new ToastCard(this.htmlElement, {
                className: `toast-${id}`,
                componentToRender: message,
                id: id,
                header: header,
                style: style,
            });
            const last = this.htmlElement.offsetHeight;
            this.animateNewCard(first, last);

            this.toastCards.set(id, newToast);

            // Set timeout to delete card
            this.timeout.set(
                id,
                setTimeout(() => {
                    this.removeMsg(id);
                }, timeToLive ?? DEFAULT_TIME_TO_LIVE),
            );

            // Remove timeout when cursor hovers card
            newToast.htmlElement.addEventListener('mouseenter', () => {
                clearTimeout(this.timeout.get(id));
                this.timeout.delete(id);
            });

            // Update timeout when cursor leaves card
            newToast.htmlElement.addEventListener('mouseleave', () => {
                this.timeout.set(
                    id,
                    setTimeout(() => {
                        this.removeMsg(id);
                    }, TIME_TO_LIVE_MORE),
                );
            });
        }
    }

    protected animateNewCard(first: number, last: number) {
        this.htmlElement.animate(
            [
                {
                    transform: `translateY(${last - first}px)`,
                },
                { transform: 'translateY(0)' },
            ],
            {
                duration: 150,
                easing: 'ease-out',
            },
        );
    }

    protected getNextMsgId() {
        let id = 0;
        if (this.toastCards.size !== 0) {
            id = this.nextId % (this.props.maxToastCards + 1);
        }

        while (this.toastCards.has(id)) {
            id = (id + 1) % this.props.maxToastCards;
        }
        this.nextId = id + 1;
        return id;
    }

    protected componentDidMount() {
        this.htmlElement.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
            const id = getCardIdIfCloseBtn(target);
            if (id !== undefined) {
                this.removeMsg(id);
            }
        });
    }

    protected removeMsg(id: number) {
        const item = this.toastCards.get(id);
        if (item) {
            item.destroy();
            clearTimeout(this.timeout.get(id));
            this.toastCards.delete(id);
            this.timeout.delete(id);
        }
    }

    protected render() {
        this.renderTemplate();
        this.componentDidMount();
    }
}
