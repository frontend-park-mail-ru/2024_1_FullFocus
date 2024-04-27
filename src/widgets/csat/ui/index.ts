import { Component } from '@/shared/@types/index.component';
import { CsatProps } from '@/pages/csat/ui/index.types';
import csatModalTpml from '@/widgets/csat/ui/index.template.pug';
import './index.style.scss';

export class CsatModal extends Component<HTMLElement, CsatProps> {
    constructor(parent: Element) {
        super(parent, csatModalTpml, { className: 'csatModal' });
    }
}
