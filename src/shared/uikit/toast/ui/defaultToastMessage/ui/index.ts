import './index.style.scss';
import defaultMessageTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';
import { DefaultMessageProps } from './index.types';

export class DefaultMessage extends Component<
    HTMLDivElement,
    DefaultMessageProps
> {
    constructor(parent: Element, props: DefaultMessageProps) {
        super(parent, defaultMessageTmpl, props);
    }
}
