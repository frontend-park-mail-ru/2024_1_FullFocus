import csatPageTpml from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import './index.style.scss'
import { CsatDataModal } from '@/widgets/csatData/ui';

export class CsatDataPage extends Component<HTMLDivElement> {
    protected CsatDataModal: CsatDataModal
    constructor(parent: Element) {
        super(parent, csatPageTpml, { className: 'csatDataPage' });
    }

    protected render() {
        this.renderTemplate();
        this.CsatDataModal = new CsatDataModal(
            this.htmlElement,
        )
    }
}
