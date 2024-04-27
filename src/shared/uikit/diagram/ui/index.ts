import { Component } from '@/shared/@types/index.component';
import { DiagramProps } from '@/shared/uikit/diagram/ui/index.types'
import csatDiagramTpml from '@/shared/uikit/diagram/ui/index.template.pug';
import './index.style.scss'

export class DiagramCard extends Component<HTMLDivElement, DiagramProps> {
    constructor(parent: Element) {
        super(parent, csatDiagramTpml, { className: 'csatDataDiagram', ratings: [1,1,1,1,1,1,1,1,1,1], amount: 10 });
    }
}
