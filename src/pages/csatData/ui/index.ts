import csatPageTpml from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import './index.style.scss';
import { CsatDataModal } from '@/widgets/csatData/ui';
import { CsatDataProps } from './index.types';

export class CsatDataPage extends Component<HTMLDivElement, CsatDataProps> {
    protected CsatDataModal: CsatDataModal;
    constructor(parent: Element, params: { [name: string]: string }) {
        super(parent, csatPageTpml, {
            className: 'csatDataPage',
            questionId: params.questionId,
        });
    }

    protected render() {
        this.renderTemplate();
        if (this.props.questionId) {
            this.CsatDataModal = new CsatDataModal(this.htmlElement, {
                className: 'csat-data',
                questionId: Number(this.props.questionId),
            });
        }
    }
}
