import { domFromHtml } from "../../lib/domFromHtml/domFromHtml";
import emptyContainerTmpl from './emptyContainer.pug'

export class EmptyContainer {
    /**
     * Empty container constructor
     * @param {string} elementClass - html class of the element
     */
    constructor(elementClass) {
        this.class = elementClass;
    }

    /**
     * Renders EmptyContainer
     * @returns {HTMLElement} rendered html element
     */
    render() {
        return domFromHtml(emptyContainerTmpl({elementClass: this.class}));
    }
}
