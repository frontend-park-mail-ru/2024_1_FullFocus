import { ajax } from "../../shared/api/ajax";
import { ProfileCard } from "../../widgets/profileCard/profileCard";
import { EmptyContainer } from "../../shared/uikit/emptyContainer/emptyContainer";

export class Profile {
    /**
     * Constructor for Profile page object
     * @param {any} parent - parent object
     * @param {string} name - name of the page
     */
    constructor(parent, name) {
        this.parentItem = parent;
        this.name = name;
        this.htmlElement = null;
    }
    
    /**
     * Renders profile page
     * @returns {HTMLElement} html element of the page
     */
    render() {
        this.htmlElement = new EmptyContainer('profile-page').render();
        ajax('GET', '/me', null, (status, responseString) => {
            const isAuthorized = status === 200;

            if (!isAuthorized) {
                this.parentItem.goToPage('login');
                return;
            }

            const { email } = JSON.parse(responseString);
            const profileCardObj = new ProfileCard(this, email);
            this.htmlElement.appendChild(profileCardObj.render());
        })

        return this.htmlElement;
    }
}
