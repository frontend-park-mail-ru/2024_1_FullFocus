import { domFromHtml } from "../../lib/domFromHtml/domFromHtml";
import emptyContainerTmpl from './emptyContainer.pug'

export class EmptyContainer {
    constructor(elementClass) {
        this.class = elementClass;
    }

    render() {
        return domFromHtml(emptyContainerTmpl({elementClass: this.class}));
    }
}
