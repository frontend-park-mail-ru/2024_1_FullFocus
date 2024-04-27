import { Component } from '@/shared/@types/index.component';
import { CsatDataProps } from '@/pages/csatData/ui/index.types';
import csatDataModalTpml from '@/widgets/csatData/ui/index.template.pug';
import './index.style.scss'
import { DiagramCard } from '@/shared/uikit/diagram';

export class CsatDataModal extends Component<HTMLElement, CsatDataProps> {
    protected DiagramCard: DiagramCard

    constructor(parent: Element) {
        super(parent, csatDataModalTpml, { className: 'csatDataModal' });
    }

    protected render() {
        this.renderTemplate();
        this.DiagramCard = new DiagramCard(
            this.htmlElement,
        )
    }
}