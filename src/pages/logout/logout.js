import { EmptyContainer } from '../../shared/uikit/emptyContainer/emptyContainer';
import { ajax } from '../../shared/api/ajax';

export class LogOut {
    /**
     * Constructor for LogOut page object
     * @param {any} parent - parent object
     * @param {string} name - name of the page
     */
    constructor(parent, name) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
    }

    /**
     * Renders logout page
     * @returns {HTMLElement} html element of the page
     */
    render() {
        ajax('POST', '/api/auth/logout', null, null, (data, status) => {
            this.parentItem.goToPage('main');
        });

        const cont = new EmptyContainer(this.parentItem.htmlElement);
        cont.render();
        this.htmlElement = cont.htmlElement;
    }
}
