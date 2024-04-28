import { Component } from '@/shared/@types/index.component';
import csatModalTpml from '@/widgets/csat/ui/index.template.pug';
import './index.style.scss';
import { Button, getExitBtn } from '@/shared/uikit/button';
import { CsatModalProps } from './index.types';
import { sendCsatData } from '@/entities/user/api';

export class CsatModal extends Component<HTMLElement, CsatModalProps> {
    protected answers: HTMLDivElement;
    protected closeBtn: Button;
    protected rateBtns: Button[];

    constructor(parent: Element, props: CsatModalProps) {
        super(parent, csatModalTpml, props);
    }

    protected componentDidMount() {
        this.answers.addEventListener('click', (e: Event) => {
            const targetInit = e.target as HTMLElement;
            if (
                targetInit.classList.contains('btn') ||
                targetInit.classList.contains('btn__text')
            ) {
                const target = targetInit.closest('.btn');
                const val = Number((target as HTMLButtonElement).dataset.val);
                if (val !== undefined) {
                    this.rateBtns.forEach((btn) => {
                        btn.setDisabled();
                    });
                    sendCsatData(this.props.questionId, val)
                        .then(() => {
                            this.htmlElement
                                .getElementsByClassName('csat-widget__main')[0]
                                .remove();
                            this.htmlElement
                                .getElementsByClassName('csat-widget__thank')[0]
                                .classList.remove('display_none');
                            this.htmlElement
                                .getElementsByClassName('csat-widget__thank')[0]
                                .classList.add('csat-widget__thank--animate');
                            setTimeout(() => {
                                window.parent.postMessage('close-iframe');
                            }, 1000);
                        })
                        .catch(() => {
                            this.rateBtns.forEach((btn) => {
                                btn.setEnabled();
                            });
                        });
                }
            }
        });

        this.closeBtn.htmlElement.addEventListener('click', () => {
            window.parent.postMessage('close-iframe');
        });
    }

    protected render() {
        this.renderTemplate();

        this.closeBtn = getExitBtn(
            this.htmlElement.getElementsByClassName('csat-widget__exit')[0],
            {
                className: 'cast-widget__bottom',
                btnText: 'Спросить позже',
                type: 'button',
                btnStyle: 'white',
            },
        );

        this.rateBtns = new Array<Button>(1);
        for (let i = 0; i < 10; i++) {
            this.rateBtns[i] = new Button(
                this.htmlElement.getElementsByClassName('csat-widget__line')[0],
                {
                    className: 'csat-widget__container' + (i + 1).toString(),
                    btnText: (i + 1).toString(),
                    type: 'button',
                    btnStyle: 'withOutline',
                },
            );
            this.rateBtns[i].htmlElement.setAttribute(
                'data-val',
                (i + 1).toString(),
            );
        }

        this.answers = this.htmlElement.getElementsByClassName(
            'csat-widget__line',
        )[0] as HTMLDivElement;

        this.componentDidMount();
    }
}
