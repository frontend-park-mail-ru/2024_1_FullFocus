import { Component } from '@/shared/@types/index.component';
import { CsatProps } from '@/pages/csat/ui/index.types';
import csatModalTpml from '@/widgets/csat/ui/index.template.pug';
import './index.style.scss';
import { Button } from '@/shared/uikit/button';

export class CsatModal extends Component<HTMLElement, CsatProps> {
    protected closeBtn: Button;
    protected rateBtns: Button[];

    constructor(parent: Element) {
        super(parent, csatModalTpml, { className: 'csatModal' });
    }

    protected render() {
        this.renderTemplate();
        this.closeBtn = new Button(this.htmlElement, {className: 'cast-widget__bottom', btnText: 'Спросить позже', type: 'button', btnStyle: 'bright' });
        this.rateBtns = new Array<Button>(1);
        for (let i=0; i<10; i++){
            this.rateBtns[i] = new Button(this.htmlElement.getElementsByClassName('csat-widget__line')[0],
                {
                    className: 'csat-widget__container' + (i+1).toString(),
                    btnText: (i+1).toString(),
                    type: 'button', btnStyle: 'withOutline'
                });
            this.rateBtns[i].htmlElement.setAttribute('data-val', (i+1).toString());
        }

    }
}
