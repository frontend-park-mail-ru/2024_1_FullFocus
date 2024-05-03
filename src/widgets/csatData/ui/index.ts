import { Component } from '@/shared/@types/index.component';
import csatDataModalTpml from '@/widgets/csatData/ui/index.template.pug';
import './index.style.scss';
import { DiagramCard } from '@/shared/uikit/diagram';
import { getCsatStat } from '@/entities/user/api';
import { CsatDataProps } from './index.types';

export class CsatDataModal extends Component<HTMLElement, CsatDataProps> {
    protected DiagramCard: DiagramCard;

    constructor(parent: Element, props: CsatDataProps) {
        super(parent, csatDataModalTpml, props);
    }

    protected render() {
        this.renderTemplate();
        getCsatStat(this.props.questionId)
            .then((response) => {
                this.DiagramCard = new DiagramCard(this.htmlElement, {
                    title: response.data.title,
                    className: 'csatDataDiagram',
                    ratings: response.data.stats,
                    amount: response.data.amount,
                });
            })
            .catch(() => {});
    }
}
