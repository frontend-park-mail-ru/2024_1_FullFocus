import './index.style.scss';
import cardTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { PromocodeCardProps } from './index.types';

export class PromocodeCard extends Component<
    HTMLDivElement,
    PromocodeCardProps
> {
    constructor(parent: Element, props: PromocodeCardProps) {
        super(parent, cardTmpl, props);
    }
}
