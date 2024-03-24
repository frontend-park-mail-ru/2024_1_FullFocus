import { EmptyContainer } from '@/shared/uikit/emptyContainer/emptyContainer';
import { WithNavbar } from '@/widgets/layout/withNavbar/withNavbar';

export class Profile {
    parentItem: WithNavbar;
    name: string;
    htmlElement: HTMLDivElement;
    /**
     * Constructor for Profile page object
     * @param {any} parent - parent object
     * @param {string} name - name of the page
     */
    constructor(parent: WithNavbar, name: string) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
    }

    /**
     * Renders profile page
     */
    render() {
        const cont = new EmptyContainer(
            this.parentItem.htmlElement,
            'profile-page',
        );
        cont.render();
        this.htmlElement = cont.htmlElement;
    }
}
