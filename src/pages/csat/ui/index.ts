import csatPageTpml from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { CsatModal } from '@/widgets/csat/ui';
import { CsatProps } from './index.types';

export class CsatPage extends Component<HTMLDivElement, CsatProps> {
    protected csatModal: CsatModal;
    constructor(parent: Element, params: { [name: string]: string }) {
        super(parent, csatPageTpml, { className: 'csatPage', params: params });
    }

    protected componentDidMount() {
        this.csatModal.htmlElement.addEventListener('iframeclose', () => {});
    }

    protected render() {
        this.renderTemplate();

        if (this.props.params.question_id && this.props.params.title) {
            this.csatModal = new CsatModal(this.htmlElement, {
                className: 'csat',
                questionId: Number(this.props.params.question_id),
                title: this.props.params.title,
            });
        }
    }
}
