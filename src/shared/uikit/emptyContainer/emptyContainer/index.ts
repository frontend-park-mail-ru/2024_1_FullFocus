import emptyContainerTmpl from './emptyContainer.pug';
import { Component } from '@/shared/@types/component';

export interface ContainerProps {
    className: string;
}

export class EmptyContainer extends Component<HTMLDivElement, ContainerProps> {
    /**
     * Empty container constructor
     * @param {Element} parent - parent html element
     * @param {string} className - html class of the element
     */
    constructor(parent: Element, props: ContainerProps) {
        super(parent, emptyContainerTmpl, props);
    }
}
