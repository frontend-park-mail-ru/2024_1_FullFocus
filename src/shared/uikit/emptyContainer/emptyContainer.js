import emptyContainerTmpl from './emptyContainer.pug';

export class EmptyContainer {
    /**
     * Empty container constructor
     * @param {HTMLElement} parent - parent html element
     * @param {string} elementClass - html class of the element
     */
    constructor(parent, elementClass) {
        this.parent = parent;
        this.class = elementClass;
        this.htmlElement = null;
    }

    /**
     * Renders EmptyContainer
     * @returns {HTMLElement} rendered html element
     */
    render() {
        this.parent.insertAdjacentHTML(
            'beforeend',
            emptyContainerTmpl({ elementClass: this.class }),
        );
        this.htmlElement = this.parent.getElementsByClassName(this.class)[0];
    }
}
