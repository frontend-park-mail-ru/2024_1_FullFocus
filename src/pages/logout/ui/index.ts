import { EmptyContainer } from '@/shared/uikit/emptyContainer';
import { logoutUser } from '@/features/auth';

export class LogOut extends EmptyContainer {
    name: string;
    private navigateToMain: () => void;

    /**
     * Constructor for LogOut page object
     * @param {any} parent - parent object
     * @param {string} name - name of the page
     */
    constructor(parent: Element, name: string, navigateToMain: () => void) {
        super(parent, { className: 'logout-page' });
        this.name = name;
        this.navigateToMain = navigateToMain;
    }

    /**
     * Renders logout page
     */
    render() {
        super.render();

        logoutUser()
            .then(() => {
                this.navigateToMain();
            })
            .catch(() => {});
    }
}
