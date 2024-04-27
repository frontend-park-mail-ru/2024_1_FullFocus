import csatPageTpml from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { CsatModal } from '@/widgets/csat/ui';

export class CsatPage extends Component<HTMLDivElement> {
    protected CsadModal: CsatModal
    constructor(parent: Element) {
        super(parent, csatPageTpml, { className: 'csatPage' });
    }

    protected render() {
        this.renderTemplate();
        this.CsadModal = new CsatModal(
            this.htmlElement,
        )
    }
}
