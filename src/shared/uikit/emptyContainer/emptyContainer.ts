import emptyContainerTmpl from './emptyContainer.pug';

export class EmptyContainer {
    /**
     * Empty container constructor
     * @param {Element} parent - parent html element
     * @param {string} elementClass - html class of the element
     */
    parent: Element;
    class: string;
    htmlElement: HTMLDivElement;

    constructor(parent: Element, elementClass?: string) {
        this.parent = parent;
        this.class = elementClass ?? '';
        this.htmlElement = null;
    }

    /**
     * Renders EmptyContainer
     */
    render(): void {
        this.parent.insertAdjacentHTML(
            'beforeend',
            emptyContainerTmpl({ elementClass: this.class }),
        );
        this.htmlElement = this.parent.getElementsByClassName(
            this.class,
        )[0] as HTMLDivElement;
    }
}
