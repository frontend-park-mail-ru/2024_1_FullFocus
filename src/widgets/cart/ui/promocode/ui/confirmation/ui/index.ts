import './index.style.scss';
import { Button } from '@/shared/uikit/button';
import newCodeTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';

export class Confirmation extends Component<HTMLDivElement> {
    confirmBtn: Button;
    cancelBtn: Button;

    constructor(parent: Element, props: { className: string }) {
        super(parent, newCodeTmpl, props);
    }

    protected render() {
        this.renderTemplate();

        this.cancelBtn = new Button(this.htmlElement, {
            className: 'promocodes-section__cancel-btn',
            btnStyle: 'red',
            type: 'button',
            btnText: 'Отменить',
            size: 'xs-only',
        });

        this.confirmBtn = new Button(this.htmlElement, {
            className: 'promocodes-section__confirm-btn',
            btnStyle: 'bright',
            type: 'button',
            btnText: 'Подтвердить',
            size: 'xs-only',
        });
    }

    destroy() {
        this.confirmBtn.destroy();
        this.confirmBtn = null;
        this.cancelBtn.destroy();
        this.cancelBtn = null;
        this.htmlElement.remove();
    }
}
