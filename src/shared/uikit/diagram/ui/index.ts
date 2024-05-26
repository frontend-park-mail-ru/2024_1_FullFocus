import { Component } from '@/shared/@types/index.component';
import {
    DiagramProps,
    DiagramPropsParsed,
} from '@/shared/uikit/diagram/ui/index.types';
import csatDiagramTpml from '@/shared/uikit/diagram/ui/index.template.pug';
import './index.style.scss';

export class DiagramCard extends Component<HTMLDivElement, DiagramPropsParsed> {
    constructor(parent: Element, props: DiagramProps) {
        super(parent, csatDiagramTpml, {
            title: props.title,
            className: props.className,
            ratings: props.ratings,
            amount: props.amount,
            data: props.ratings.map((val) => {
                return {
                    percentage: ((val / props.amount) * 100).toFixed(1),
                    widthPercentage: (val / Math.max(...props.ratings)) * 100,
                };
            }),
        });
    }

    protected render() {
        this.renderTemplate();
    }
}
