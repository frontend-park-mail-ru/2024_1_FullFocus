import csatPageTpml from './index.template.pug';
import { Component } from '@/shared/@types/index.component';

export class CsatPage extends Component<HTMLDivElement> {
    constructor(parent: Element) {
        super(parent, csatPageTpml, { className: 'csatPage' });
    }
}
