import { EmptyContainer } from "../../shared/uikit/emptyContainer/emptyContainer";
import { ajax } from "../../shared/api/ajax";

export class LogOut {
    constructor(parent, name) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
    }

    render() {
        ajax('POST', '/api/auth/logout', null, null, (data, status) => {
            this.parentItem.goToPage('main');
        })
        
        const cont = new EmptyContainer;
        this.htmlElement = cont.render();
        return this.htmlElement;
    }
}