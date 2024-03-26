import { EmptyContainer } from '../../shared/uikit/emptyContainer/emptyContainer';
import { ajax } from '../../shared/api/ajax';
import { WithNavbar } from '@/widgets/layout/withNavbar/withNavbar';

export class LogOut {
    parentItem: WithNavbar;
    name: string;
    htmlElement: HTMLDivElement;

    /**
     * Constructor for LogOut page object
     * @param {any} parent - parent object
     * @param {string} name - name of the page
     */
    constructor(parent: WithNavbar, name: string) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
    }

    /**
     * Renders logout page
     */
    render() {
        const p = ajax('POST', '/api/auth/logout', null, null);

        p.then(() => {
            this.parentItem.goToPage('main');
        }).catch((error) => {
            console.log(error);
        });

        const cont = new EmptyContainer(this.parentItem.htmlElement);
        cont.render();
        this.htmlElement = cont.htmlElement;
    }
}
