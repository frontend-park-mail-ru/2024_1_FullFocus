import { EmptyContainer } from '@/shared/uikit/emptyContainer';
import { WithNavbar } from '@/widgets/layout';
import { logoutUser } from '@/features/auth';

export class LogOut extends EmptyContainer {
    parentItem: WithNavbar;
    name: string;

    /**
     * Constructor for LogOut page object
     * @param {any} parent - parent object
     * @param {string} name - name of the page
     */
    constructor(parent: WithNavbar, name: string) {
        super(parent.contentElement, { className: 'logout-page' });
        this.parentItem = parent;
        this.name = name;
    }

    /**
     * Renders logout page
     */
    render() {
        super.render();

        logoutUser()
            .then(() => {
                this.parentItem.goToPage('main');
            })
            .catch(() => {});
    }
}
