import csatPageTpml from './index.template.pug';
import { Component } from '@/shared/@types/index.component';

export class CsatDataPage extends Component<HTMLDivElement> {
    constructor(parent: Element) {
        super(parent, csatPageTpml, { className: 'csatDataPage' });
    }
}
