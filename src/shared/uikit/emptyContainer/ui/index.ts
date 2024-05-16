import emptyContainerTmpl from './index.template.pug';
import { Component } from '@/shared/@types/index.component';

export interface ContainerProps {
    className: string;
}

export class EmptyContainer extends Component<HTMLDivElement, ContainerProps> {
    /**
     * Empty container constructor
     * @param {Element} parent - parent html element
     */
    constructor(parent: Element, props: ContainerProps) {
        super(parent, emptyContainerTmpl, props);
    }

    set innerText(text: string) {
        this.htmlElement.innerText = text;
    }
}
